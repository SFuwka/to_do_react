<Paper className={classes.topControll}>
<Button color='primary' onClick={toggleNewProject} variant='contained'
    className={`${classes.newProjectButton} ${newProjectMenuOpen ? classes.success : ''}`}>
    {!newProjectMenuOpen ? 'new project' : 'projects'}</Button>
<div className={classes.search}>
    <div>
        <div className={classes.searchIcon}><SearchIcon /></div>
        <InputBase
            disabled={newProjectMenuOpen}
            placeholder="Search…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
        />
    </div>
</div>
</Paper>