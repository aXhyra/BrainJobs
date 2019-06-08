module.exports = (req, res) => {
        res.status(200).json([{
                call: 'Login',
                type: 'POST',
                endpoint: '/login',
                tokenRequired: false,
                adminOnly: false,
                params: {
                    encoding: 'application/x-www-form-urlencoded',
                    headParams: 'contentType',
                    bodyParams: [
                        'username',
                        'password'
                    ]
                },
                returns: {
                    success: {
                        status: 200,
                        success: true,
                        message: "logged in",
                        toekn: "<token>"
                    },
                    insuccess: {
                        status: 400,
                        success: false,
                        message: "Invalid username or password"
                    }
                }
            },
            {
                call: 'Register',
                type: 'POST',
                endpoint: '/register',
                tokenRequired: false,
                adminOnly: false,
                params: {
                    encoding: 'application/x-www-form-urlencoded',
                    headParams: false,
                    bodyParams: [
                        'username',
                        'email',
                        'password'
                    ]
                },
                returns: {
                    success: {
                        status: 200,
                        success: true,
                        message: "User created"
                    },
                    insuccess: {
                        status: 400,
                        success: false,
                        message: "User already exists"
                    }
                }
            },
            {
                call: 'New job',
                type: 'POST',
                endpoint: '/job/new',
                tokenRequired: true,
                adminOnly: false,
                params: {
                    encoding: 'application/x-www-form-urlencoded',
                    headParams: {
                        Authorization: '<token>'
                    },
                    bodyParams: [
                        'title',
                        'language',
                        'framework',
                        'datatset',
                        'dataset_datatype',
                        'model'
                    ]
                },
                returns: {
                    success: {
                        status: 201,
                        success: true,
                        job_id: 2,
                        status: "created"
                    },
                    insuccess: [{
                            status: 400,
                            success: false,
                            message: "User already exists"
                        },
                        {
                            status: 400,
                            success: false,
                            message: "incorrect language"
                        },
                        {
                            status: 400,
                            success: false,
                            message: "incorrect framework"
                        },
                        {
                            status: 400,
                            success: false,
                            message: "Job.{field} cannot be null"
                        }
                    ]
                }
            },
            {
                call: 'get specific logged in user job',
                type: 'GET',
                endpoint: '/api/job/:job_id',
                tokenRequired: true,
                adminOnly: false,
                params: {
                    encoding: 'application/x-www-form-urlencoded',
                    headParams: {
                        Authorization: '<token>'
                    },
                    bodyParams: null
                },
                returns: {
                    success: {
                        status: 200,
                        user_id: '<user_id>',
                        title: '<title>',
                        language: '<language>',
                        framework: '<framework>',
                        dataset: '<dataset>',
                        dataset_datatype: '<dataset_datatype>',
                        model: '<model>',
                        status: '<status>',
                        job_id: '<job_id>',
                        created_at: '<created_at>',
                        updated_at: '<updated_at>'
                    },
                    insuccess: [{
                            status: 401,
                            success: false,
                            message: "invalid token"
                        },
                        {
                            status: 401,
                            success: false,
                            message: "jwt expired"
                        },
                        {
                            status: 404,
                            success: false,
                            message: "job not found"
                        }
                    ]
                }
            },
            {
                call: 'get all logged in user jobs',
                type: 'GET',
                endpoint: '/api/jobs',
                tokenRequired: true,
                adminOnly: false,
                params: {
                    encoding: 'application/x-www-form-urlencoded',
                    headParams: {
                        Authorization: '<token>'
                    },
                    bodyParams: null
                },
                returns: {
                    success: ['<job>'],
                    insuccess: [{
                            status: 401,
                            success: false,
                            message: "invalid token"
                        },
                        {
                            status: 401,
                            success: false,
                            message: "jwt expired"
                        },
                        {
                            status: 404,
                            success: false,
                            message: "user has no jobs"
                        }
                    ]
                }
            },
            {
                call: 'get all jobs',
                type: 'GET',
                endpoint: '/api/jobs/all',
                tokenRequired: true,
                adminOnly: true,
                params: {
                    encoding: 'application/x-www-form-urlencoded',
                    headParams: {
                        Authorization: '<token>'
                    },
                    bodyParams: null
                },
                returns: {
                    success: ['<job>'],
                    insuccess: [{
                            status: 401,
                            success: false,
                            message: "invalid token"
                        },
                        {
                            status: 401,
                            success: false,
                            message: "jwt expired"
                        },
                        {
                            status: 404,
                            success: false,
                            message: "user has no jobs"
                        },
                        {
                            status: 401,
                            success: false,
                            message: "Only admin can view all jobs"
                        }
                    ]
                }
            },
            {
                call: 'get all jobs of a user',
                type: 'GET',
                endpoint: '/api/user/:user_id/jobs',
                tokenRequired: true,
                adminOnly: true,
                params: {
                    encoding: 'application/x-www-form-urlencoded',
                    headParams: {
                        Authorization: '<token>'
                    },
                    bodyParams: null
                },
                returns: {
                    success: ['<job>'],
                    insuccess: [{
                            status: 401,
                            success: false,
                            message: "invalid token"
                        },
                        {
                            status: 401,
                            success: false,
                            message: "jwt expired"
                        },
                        {
                            status: 404,
                            success: false,
                            message: "user has no jobs"
                        },
                        {
                            status: 401,
                            success: false,
                            message: "Only admin can view all jobs"
                        }
                    ]
                }
            },
            {
                call: 'get a specific job of a user',
                type: 'GET',
                endpoint: '/api/user/:user_id/job/:job_id',
                tokenRequired: true,
                adminOnly: true,
                params: {
                    encoding: 'application/x-www-form-urlencoded',
                    headParams: {
                        Authorization: '<token>'
                    },
                    bodyParams: null
                },
                returns: {
                    success: '<job>',
                    insuccess: [{
                            status: 401,
                            success: false,
                            message: "invalid token"
                        },
                        {
                            status: 401,
                            success: false,
                            message: "jwt expired"
                        },
                        {
                            status: 404,
                            success: false,
                            message: "user has no jobs"
                        },
                        {
                            status: 401,
                            success: false,
                            message: "Only admin can view all jobs"
                        }
                    ]
                }
            },
        ])
    }