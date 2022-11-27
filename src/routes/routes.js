// const dbConnect=require('./mongodb');

require("dotenv").config();

module.exports = function (app, db) {
    // dummy route
    // =================admin Api===================
    app.get("/admin", (req, res) => {
        try {
            db.collection("admin")
                .find({})
                .toArray((err, res) => console.log("done...", res, err));
            res.send("Admin update part");
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });
    // =========================================================================================
    app.post("/signin", (req, res) => {
        console.log("Signin API");
        let k = req.body
        // console.log(k);
        // let temp = k.email && k.password && k.admin === true;
        // console.log(temp);
        // console.log(k);
        // Check if session already exists ?
        if (req.session && req.session.userid) {
            res.json({
                status: "warn",
                message: "Session already exists !",
                lastUpdated: req.session.lastUpdated,
                isLatest: false,
                isLogged: true,
                profile: req.session.profile,
            })
        }
        // check if values aren't null
        else if (k.email && k.password && k.admin === true) {
            // let q = (k.accountType === "admin") ? "admin" : "admin"
            // console.log("After login ");
            // console.log(result);

            db.collection("users").findOne({ email: k.email, password: k.password, admin: k.admin, }, {
                projection: {
                    _id: 1,
                    profile: 1
                }
            }, (error, result) => {
                if (error) {
                    res.json({
                        status: "error",
                        message: error,
                        isLogged: false,
                    })
                    // console.log(error)
                }
                // if user exists...
                else if (result) {
                    // log in by saving to session
                    req.session.userid = k.email
                    req.session.profile = result.profile
                    req.session.admin = result.profile.admin
                    req.session.lastUpdated = new Date()
                    // return details
                    res.json({
                        status: "success",
                        message: "Log in success !",
                        lastUpdated: req.session.lastUpdated,
                        isLatest: true,
                        isLogged: true,
                        isAdmin: true,
                        profile: req.session.profile,
                    })
                }
                // No rows matched ...
                else {
                    try {
                        res.json({
                            status: "error",
                            message: "Invalid userid or password",
                            isLogged: false,
                        })
                    } catch (e) { console.log(e) }
                }
            })
        }
        else if (k.email && k.password && k.admin === false) {
            // let q = (k.accountType === "admin") ? "admin" : "admin"
            // console.log("After login ");
            // console.log(k);
            db.collection("users").findOne({ email: k.email, password: k.password, admin: k.admin }, {
                projection: {
                    _id: 1,
                    profile: 1
                }
            }, (error, result) => {
                if (error) {
                    res.json({
                        status: "error",
                        message: error,
                        isLogged: false,
                    })
                    console.log(error)
                }
                // if user exists...
                else if (result) {
                    // log in by saving to session
                    req.session.userid = k.email
                    req.session.profile = result.profile
                    req.session.admin = result.profile.admin
                    req.session.lastUpdated = new Date()
                    // return details
                    res.json({
                        status: "success",
                        message: "Log in success !",
                        lastUpdated: req.session.lastUpdated,
                        isLatest: true,
                        isLogged: true,
                        isAdmin: false,
                        profile: req.session.profile,
                    })
                }
                // No rows matched ...
                else {
                    try {
                        res.json({
                            status: "error",
                            message: "Invalid userid or password",
                            isLogged: false,
                        })
                    } catch (e) { console.log(e) }
                }
            })
        }
        // either of email or password is null
        else {
            console.log("Account type is incorrect")
            res.json({
                status: "error",
                message: "Empty userid or password",
                isLogged: false,
            })
        }
    })

    app.get("/logout", (req, res) => {
        // log it out
        console.log("logging out : ", req.session.userid)
        if (req.session) req.session.destroy()
        res.json({
            status: "success",
            message: "Logout success !",
        })
    })

    app.get("/status", (req, res) => {
        // console.log("======================================================================")
        // console.log(req.session)
        // console.log("===========")
        if (req.session && req.session.userid) {
            console.log(req.session)
            // let q = (req.session.admin === true) ? "members" :false;
            db.collection("users").findOne({ email: req.session.userid }, {
                projection: {
                    _id: 0,
                    profile: 1
                }
            }, (error, result) => {
                if (error) {
                    res.json({
                        status: "success",
                        message: "Session exists !",
                        isLogged: true,
                        lastUpdated: req.session.lastUpdated,
                        isLatest: false,
                        isAdmin: req.session.profile.admin,
                        errorLatest: error,
                        profile: req.session.profile,
                    })
                    throw error
                } else {
                    res.json({
                        status: "success",
                        message: "Session exists !",
                        lastUpdated: new Date(),
                        isLatest: true,
                        isLogged: true,
                        isAdmin: req.session.profile.admin,
                        profile: result.profile,
                    })
                }
            })
        }
        // not logged in, redirect user to login page
        else {
            res.json({
                status: "success",
                message: "Not logged in !",
                isLogged: false,
            })
        }
    })

    app.post("/register", (req, res) => {
        let k = req.body;
        console.log(req.body);
        // Check if already logged in ?
        if (req.session && req.session.userid) {
            res.json({
                status: "warn",
                message: "Session already exists !",
                isLogged: true,
                lastUpdated: req.session.lastUpdated,
                isLatest: false,
                // keys: req.session.keys,
                profile: req.session.profile,
            });
        }
        // check if any value is not null
        else if (
            k.name &&
            k.email &&
            k.password &&
            k.phoneno &&
            !k.admin
        ) {
            // check if record already exists...
            db.collection("users").findOne(
                { email: k.email },
                { projection: { _id: 1, email: 1 } },
                (error, result) => {
                    if (result && result._id) {
                        res.json({
                            status: "error",
                            message: "User already exists !",
                            isLogged: false,
                        });
                    }
                    // email doesn't exists, create one
                    else {
                        let obj = {
                            email: k.email,
                            name: k.name,
                            profile: {
                                name: k.name,
                                phoneno: k.phoneno,
                                email: k.email,
                                admin: k.admin,
                            },
                            admin: k.admin,
                            password: k.password,
                        };
                        db.collection("users").insertOne(obj, (error, results) => {
                            if (error) {
                                res.json({
                                    status: "error",
                                    message: error,
                                    isLogged: false,
                                });
                                throw error;
                            }
                            // Records inserted, auto log in
                            else {
                                // log it in
                                req.session.userid = k.email;
                                req.session.profile = obj.profile;
                                req.session.lastUpdated = new Date();
                                res.json({
                                    status: "success",
                                    message: "Account created !",
                                    lastUpdated: req.session.lastUpdated,
                                    isLatest: true,
                                    isLogged: true,
                                    isAdmin: k.admin,
                                    profile: obj.profile,
                                });
                            }
                        });
                    }
                }
            );
        } else {
            // some fields are null
            res.json({
                status: "error",
                message: "Empty or invalid data",
                isLogged: false,
            });
        }
    });


    app.get("/get_all_flight", (req, res) => {
        if (req.session && req.session.userid && req.session.profile.admin) {
            console.log(req.session)
            try {
                let k = req.body;
                console.log(k);
                db.collection("flights")
                    .find()
                    .toArray((error, results) => {
                        if (error) {
                            res.json({
                                status: "error",
                                message: "unable to fetch data with requested params",
                                isLogged: true,
                            });
                            throw error;
                        }
                        res.json(results);
                    });
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        }
        // not logged in, redirect user to login page
        else {
            res.json({
                status: "error",
                message: "Only Admin can access",
                isLogged: false,
            })
        }
    })


    app.get("/get_all_data", (req, res) => {
        if (req.session && req.session.userid ) {
            console.log(req.session)
            try {
                let k = req.body;
                console.log(k);
                db.collection("flights")
                    .find()
                    .toArray((error, results) => {
                        if (error) {
                            res.json({
                                status: "error",
                                message: "unable to fetch data with requested params",
                                isLogged: true,
                            });
                            throw error;
                        }
                        res.json(results);
                    });
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        }
        // not logged in, redirect user to login page
        else {
            res.json({
                status: "error",
                message: "logging is required",
                isLogged: false,
            })
        }
    })


    app.post("/add_flight", (req, res) => {
        let k = req.body;
        console.log(req.body);
        console.log(req.session);
        // Check if already logged in ?
        if (req.session && req.session.userid && req.session.profile.admin) {
            if (
                k.flightno &&
                k.from &&
                k.to &&
                k.date &&
                k.duration &&
                k.price &&
                k.seats &&
                k.flightname) {
                db.collection("flights").findOne(
                    { flightno: k.flightno },
                    { projection: { _id: 1, flightno: 1 } },
                    (error, result) => {
                        if (result && result._id) {
                            res.json({
                                status: "error",
                                message: "Flight already present!"
                            });
                        }
                        // email doesn't exists, create one
                        else {
                            let obj = {
                                flightno: k.flightno,
                                from: k.from,
                                to: k.to,
                                date: k.date,
                                duration: k.duration,
                                price: k.price,
                                seats: k.seats,
                                flightname: k.flightname,
                            };
                            db.collection("flights").insertOne(obj, (error, results) => {
                                if (error) {
                                    res.json({
                                        status: "error",
                                        message: error,
                                        isLogged: false,
                                    });
                                    throw error;
                                }
                                // Records inserted, auto log in
                                else {
                                    res.json({
                                        status: "success",
                                        message: "Flight added successfully !",
                                    });
                                }
                            });
                        }
                    }
                );

            } else {
                res.json({
                    status: "error",
                    message: "Invalid data",
                });
            }
        }
        else {
            // some fields are null
            res.json({
                status: "error",
                message: "Only Admin can add data or invalid user Access",
                isLogged: false,
            });
        }
    });

    app.delete("/delete_flight", (req, res) => {
        if (req.session && req.session.userid && req.session.profile.admin) {
            let k = req.body;
            console.log(req.body);
            db.collection("flights").deleteOne({ flightno: k.flightno }, (error, results) => {
                if (error) {
                    res.json({
                        status: "error",
                        message: error,
                        isLogged: false,
                    });
                    throw error;
                }
                // Records inserted, auto log in
                else {
                    res.json({
                        status: "success",
                        message: "Flight deleted successfully !",
                    });
                }
            });
        } else {
            res.json({
                status: "error",
                message: "Only Admin can delete data or invalid user Access",
                isLogged: false,
            });
        }
    })


    app.post("/flight_booking", (req, res) => {
        if (req.session && req.session.userid) {
            let k = req.body;
            console.log(req.body);
            db.collection("flights").findOne({ flightno: k.flightno }, (error, results) => {
                if (error) {
                    res.json({
                        status: "error",
                        message: error,
                    });
                    throw error;
                }
                else if (results) {
                    db.collection("users").findOne({ email: k.email }, (error, result_user) => {
                        if (error) {
                            res.json({
                                status: "error",
                                message: error,
                            });
                            throw error;
                        } else if (results.seats > 0 && result_user) {
                            db.collection("bookings").findOne(
                                {
                                    email: k.email,
                                    flightno: k.flightno
                                }, { projection: { _id: 1, email: 1, tenderName: 1, tenderValue: 1, profile: 1 } },
                                (error, results_combine) => {
                                    if (results_combine && results_combine._id) {
                                        res.json({
                                            status: "sucess ",
                                            message: "Flight already booked!"
                                        });
                                    } else {
                                        db.collection("flights").findOneAndUpdate(
                                            { flightno: k.flightno },
                                            {
                                                $set: {
                                                    seats: results.seats - 1,
                                                }
                                            },
                                        )
                                        let obj = {
                                            flightno: k.flightno,
                                            email: k.email,
                                            profile: {
                                                from: results.from,
                                                to: results.to,
                                                date: results.date,
                                                duration: results.duration,
                                                price: results.price,
                                                seats: results.seats - 1,
                                                flightname: results.flightname,
                                                name: req.session.profile.name,
                                                phoneno: req.session.profile.phoneno,
                                                admin: req.session.profile.admin,
                                            },
                                        };
                                        db.collection("bookings").insertOne(obj, (error, results) => {
                                            if (error) {
                                                res.json({
                                                    status: "error",
                                                    message: error,
                                                    isLogged: false,
                                                });
                                                throw error;
                                            }
                                            // Records inserted, auto log in
                                            else {
                                                res.json({
                                                    status: "success",
                                                    message: "Booking made successfully !",
                                                });
                                            }
                                        });
                                    }
                                })
                        } else if (result_user == null) {
                            res.json({
                                status: "error",
                                message: "User not found",
                            });
                        }
                        else {
                            res.json({
                                status: "error",
                                message: "Seats not available",
                            });
                        }
                    })
                }
                else {
                    res.json({
                        status: "error",
                        message: "Flight not found",
                    });
                }
            })
        }
        else {
            res.json({
                status: "error",
                message: "Only logged in users can book flights",
            });
        }
    })

    app.get("/get_count", (req, res) => {
        let k = req.body;
        if (req.session && req.session.userid) {
            if (k.flightno != null && k.email == null) {

                db.collection("bookings").countDocuments({
                    flightno: k.flightno,
                }, (error, results) => {
                    if (error) {
                        res.json({
                            status: "error",
                            message: error,
                            isLogged: false,
                        });
                        throw error;
                    }
                    else if (results != 0) {
                        db.collection("bookings").find({ flightno: k.flightno })
                            .toArray((error, detail_results) => {
                                if (error) {
                                    res.json({ error });
                                } else {
                                    res.json({
                                        status: "success",
                                        message: "No of flights Counted successfully !",
                                        count: results,
                                        desc: detail_results
                                    });
                                }
                            });
                    }
                    else {
                        res.json({
                            status: "success",
                            message: "No records found",
                        });
                    }
                })
            }
            else if (k.flightno == null && k.email != null) {
                db.collection("bookings").countDocuments({
                    email: k.email,
                }, (error, results) => {
                    if (error) {
                        res.json({
                            status: "error",
                            message: error,
                            isLogged: false,
                        });
                        throw error;
                    }
                    else if (results != 0) {
                        db.collection("bookings").find({ email: k.email })
                            .toArray((error, detail_results) => {
                                if (error) {
                                    res.json({ error });
                                } else {
                                    res.json({
                                        status: "success",
                                        message: "No of Users Counted successfully !",
                                        count: results,
                                        desc: detail_results
                                    });
                                }
                            });
                    }
                    else {
                        res.json({
                            status: "Success",
                            message: "No records found",
                        });
                    }
                })
            } else {
                res.json({
                    status: "error",
                    message: "Invalid data",
                });
            }
        } else {
            res.json({
                status: "error",
                message: "Only logged in users can see the count of flights",
            });
        }
    })
};