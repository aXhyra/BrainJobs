const Job = require('../models').Job;

const languages = [
    'python',
    'java',
    'scala',
    'r',
    'c++',
    'julia'
];

const frameworks = [
    'pytorch',
    'tensorflow',
    'caffe',
    'keras',
    'deeplearning4j',
    'apache_mahout',
    'apache_singa'
];

module.exports = {
    create(req, res) {
        const language = req.body.language;
        const framework = req.body.framework;
        console.log(framework);
        console.log("Body: " + req.body);

        if (!languages.includes(language)) {
            res.json({
                statusC: 400,
                success: false,
                message: 'incorrect language'
            });
        } else if (!frameworks.includes(framework) && framework) {
            res.json({
                statusC: 400,
                success: false,
                message: 'incorrect framework'
            });
        } else {
            return Job
                .create({
                    user_id: req.body.user_id,
                    title: req.body.title,
                    language: language,
                    framework: framework,
                    dataset: req.body.dataset,
                    dataset_datatype: req.body.dataset_datatype,
                    model: req.body.model,
                    status: 'created'
                })
                .then(job => res.json({
                    statusC: 201,
                    success: true,
                    job_id: job.id,
                    status: 'created'
                }))
                .catch(err => {res.json({
                    statusC: 400,
                    success: false,
                    message: err.errors[0].message
                });
                console.log(err);
            })
            }
    },
    userJobs(req, res) {
        console.log('HEY ' + req.query.user_id)
        return Job
            .findAll({
                attributes: [
                    ['id', 'job_id'],
                    'title',
                    'language',
                    'framework',
                    'model',
                    'status'
                ],
                where: {
                    user_id: req.query.user_id
                },
            })
            .then(jobs => {
                if (jobs.length != 0) {
                    res.status(200).send(jobs)
                } else {
                    res.json({
                        statusC: 404,
                        success: false,
                        message: 'user has no jobs'
                    })
                }
            })
            .catch(err => {res.json({
                statusC: 400,
                success: false,
                message: 'An error occoured during the query' 
            });
            console.log(err);
        })
    },
    allJobs(req, res) {
        if (req.query.isAdmin === 'true') {
            return Job
                .findAll({
                    attributes: [
                        ['id', 'job_id'],
                        'title',
                        'language',
                        'framework',
                        'model',
                        'status'
                    ]
                })
                .then(job => res.status(200).send(job))
                .catch(err => res.json({
                    statusC: 400,
                    success: false,
                    message: 'An error occoured during query creation'
                }))
            } else {
                res.json({
                    statusC: 401,
                    success: false,
                    message: 'Only admin can view all jobs'
                })
            }
    },
    search(req, res) {
        return Job
            .findOne({
                attributes: {
                    include: [
                        ['id', 'job_id'],
                        ['createdAt', 'created_at'],
                        ['updatedAt', 'updated_at']
                    ],
                    exclude: [
                        'id',
                        'createdAt',
                        'updatedAt'
                    ]
                },
                where: {
                    user_id: req.query.user_id,
                    id: req.params.job_id
                }
            })
            .then(job => {
                if (job) {
                    res.status(200).send(job)
                } else {
                    res.json({
                        statusC: 404,
                        success: false,
                        message: 'job not found'
                    })
                }
            })
            .catch(err => res.json({
                statusC: 400,
                success: false,
                message: 'Error while excecuting query'
            }));
    },
    searchUserJobs(req, res) {
        if (req.query.isAdmin) {
            const user_id = req.params.user_id;
            return Job
                .findAll({
                    where: {
                        user_id: user_id
                    }
                })
                .then(job => res.status(200).send(job))
                .catch(err => res.json({
                    statusC: 400,
                    success: false,
                    message: 'Error while excecuting query'
                }));
            } else {
                res.json({
                    statusC: 401,
                    success: false,
                    message: "Only admin can view user jobs"
                })
            }
    },
    searchUserJob(req, res) {
        if (req.query.isAdmin === 'true') {
            return Job
                .findOne({
                    where: {
                        user_id: req.params.user_id,
                        id: req.params.job_id
                    }
                })
                .then(job => res.status(200).send(job))
                .catch(err => res.json({
                    statusC: 400,
                    success: false,
                    message: 'Error while excecuting query'
                }));
        } else {
            res.json({
                statusC: 401,
                success: false,
                message: "Only admin can view user jobs"
            })
        }
    }
}