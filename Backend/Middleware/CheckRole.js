


export default (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(400).json({ msg: 'Role is Required' });
        }
        console.log(roles, 'In role middleware');
        next()
    }

}