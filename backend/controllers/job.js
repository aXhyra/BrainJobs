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

        if (!languages.includes(req.body.language)) {
            res.status(400).json({
                success: false,
                message: 'incorrect language'
            });
        } else if (!frameworks.includes(req.body.framework) && req.body.framework) {
            res.status(400).json({
                success: false,
                message: 'incorrect framework'
            });
        } else if (req.body.title === '' || req.body.dataset === '' || req.body.dataset_datatype === '' || req.body.model === '') {
            res.status(400).json({
                success: false,
                message: 'All fields must be completed'
            })
        } else {
            return Job
                .create({
                    user_id: req.decoded.user_id,
                    title: req.body.title,
                    language: req.body.language,
                    framework: req.body.framework,
                    dataset: req.body.dataset,
                    dataset_datatype: req.body.dataset_datatype,
                    model: req.body.model,
                    status: 'created'
                })
                .then(job => res.status(201).json({
                    success: true,
                    job_id: job.id,
                    status: 'created'
                }))
                .catch(err => {
                    res.status(400).json({
                        success: false,
                        message: err.errors[0].message
                    });
                    console.log(err);
                })
        }
    },
    userJobs(req, res) {
        return Job
            .findAll({
                attributes: [
                    ['id', 'job_id'],
                    'title',
                    'language',
                    'framework',
                    ['createdAt', 'created_at'],
                    'status'
                ],
                where: {
                    user_id: req.decoded.user_id
                },
            })
            .then(jobs => {
                if (jobs.length != 0) {
                    res.send(jobs)
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'user has no jobs'
                    })
                }
            })
            .catch(err => {
                res.status(400).json({
                    success: false,
                    message: err.errors[0].message
                });
                console.log(err);
            })
    },
    allJobs(req, res) {
        if (req.decoded.isAdmin) {
            return Job
                .findAll({
                    attributes: [
                        ['id', 'job_id'],
                        'user_id',
                        'title',
                        'language',
                        'framework',
                        ['createdAt', 'created_at'],
                        'status'
                    ]
                })
                .then(job => res.status(200).send(job))
                .catch(err => res.status(400).json({
                    success: false,
                    message: err.errors[0].message
                }))
        } else {
            res.status(401).json({
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
                    user_id: req.decoded.user_id,
                    id: req.params.job_id
                }
            })
            .then(job => {
                if (job) {
                    res.send(job)
                } else {
                    res.status(404).json({
                        success: false,
                        message: 'job not found'
                    })
                }
            })
            .catch(err => res.status(400).json({
                success: false,
                message: err.errors[0].message
            }));
    },
    searchUserJobs(req, res) {
        if (req.decoded.isAdmin) {
            const user_id = req.params.user_id;
            return Job
                .findAll({
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
                        user_id: user_id
                    }
                })
                .then(job => {
                    if (job.length !== 0)
                        res.send(job)
                    else {
                        res.status(404).json({
                            success: false,
                            message: 'user not found'
                        })
                    }
                })
                .catch(err => res.status(400).json({
                    success: false,
                    message: err.errors[0].message
                }));
        } else {
            res.status(401).json({
                success: false,
                message: "Only admin can view user jobs"
            })
        }
    },
    searchUserJob(req, res) {
        if (req.decoded.isAdmin) {
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
                        user_id: req.params.user_id,
                        id: req.params.job_id
                    }
                })
                .then(job => {
                    if (job)
                        res.send(job)
                    else {
                        res.status(404).json({
                            success: false,
                            message: 'job not found'
                        })
                    }
                })
                .catch(err => res.statsu(400).json({
                    success: false,
                    message: err.errors[0].message
                }));
        } else {
            res.statsu(401).json({
                success: false,
                message: "Only admin can view user jobs"
            })
        }
    }
}