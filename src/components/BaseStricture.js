import React, { useRef } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { MainListItems, secondaryListItems } from './sideBar/listItems';
import { useStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { darkMode, sideBarOpen, toggleDarkMode, toggleSideBar } from '../features/theme/themeSlice';
import { NavLink } from 'react-router-dom';
import Copyright from './footer/Copyright';
import ContentSwitch from './content/ContentSwitch';
import AuthButton from './Auth/AuthButton';
import Context from './Context';

export default function BaseStricture() {
    const classes = useStyles()
    const mainContentRef = useRef()
    const darkTheme = useSelector(darkMode)
    const sideBarCollapse = useSelector(sideBarOpen)
    const dispatch = useDispatch()

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, sideBarCollapse && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => dispatch(toggleSideBar())}
                        className={clsx(classes.menuButton, sideBarCollapse && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        TO_DO
                    </Typography>
                    <IconButton onClick={() => dispatch(toggleDarkMode())}>
                        {darkTheme ? <Brightness3Icon /> : <Brightness7Icon />}
                    </IconButton>
                    <div style={{ minWidth: 90 }}>
                        <NavLink className={classes.loginButton} to='/login'>
                            <AuthButton />
                        </NavLink>
                    </div>

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !sideBarCollapse && classes.drawerPaperClose),
                }}
                open={sideBarCollapse}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => dispatch(toggleSideBar())}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>

                <Divider />
                <List><MainListItems /></List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <main ref={mainContentRef} className={classes.content} id='content'>
                <div className={classes.contentWraper} >
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container} >
                        <Context.Provider value={mainContentRef}><ContentSwitch /></Context.Provider>
                    </Container>
                    <div className={classes.push}></div>
                </div>
                <Box className={classes.footer}>
                    <Copyright />
                </Box>
            </main>
        </div>
    )
}