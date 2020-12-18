module.exports = async (req, res) => { 
    res.clearCookie("AuthToken");
    return res.render('login');
}