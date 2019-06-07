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
        console.log(framework)

        if (!languages.includes(language)) {
            res.status(400).json({
                success: false,
                message: 'incorrect language'
            });
        } else if (!frameworks.includes(framework) && framework) {
            res.status(400).json({
                success: false,
                message: 'incorrect framework'
            });
        } else {
            return Job
                .create({
                    user_id: req.decoded.user_id,
                    title: req.body.title,
                    language: language,
                    framework: framework,
                    dataset: req.body.dataset,
                    dataset_datatype: req.body.dataset_datatype,
                    model: req.body.model,
                    created_at: Date.now(),
                    status: 'created'
                })
                .then(job => res.status(201).json({
                    success: true,
                    job_id: job.id,
                    status: 'created'
                }))
                .catch(err => {res.status(400).json({
                    success: false,
                    error: err,
                    message: 'an error happened during the creation of the job. try again'
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
                    'model',
                    'status'
                ],
                where: { user_id: req.decoded.user_id },
            })
            .then(job => res.status(200).send(job))
            .catch(err => res.status(400).json({
                success: false,
                message: 'An error occoured during rhe query'
            }));
    },
    allJobs(req, res) {
        if (req.decoded.user_id == 1) {
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
                .catch(err => res.status(400).json({
                    success: false,
                    message: 'An error occoured during query creation'
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
                where: {
                    user_id: req.decoded.user_id,
                    id: req.query.job_id
                }
            })
            .then(job => res.status(200).send(job))
            .catch(err => res.status(400).json({
                success: false,
                message: 'Error while excecuting query'
            }));
    },
    searchUserJob(req, res) {
        if (req.decoded.user_id == 1) {
            const user_id = req.query.user_id;
            return Job
                .findAll({
                    where: {
                        user_id: user_id
                    }
                })
                .then(job => res.status(200).send(job))
                .catch(err => res.status(400).json({
                    success: false,
                    message: 'Error while excecuting query'
                }));
            } else {
                res.status(401).json({
                    success: false,
                    message: "Only admin can view user jobs"
                })
            }
    }
}