import { useEffect } from "react";

const useClickAway = (ref, exception, callBack) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                if (typeof exception === 'function') {
                    return exception()
                }
                if (!exception.current.contains(event.target)) {
                    callBack()
                }
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, exception, callBack]);
}

export default useClickAway