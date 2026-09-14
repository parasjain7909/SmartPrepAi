const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, "Task title is required" ]
    },
    description: {
        type: String,
        required: [ true, "Task description is required" ]
    },
    skill: {
        type: String,
        required: [ true, "Task skill/topic is required" ]
    },
    day: {
        type: Number,
        required: [ true, "Task day is required" ]
    },
    estimatedHours: {
        type: Number,
        required: [ true, "Estimated hours is required" ]
    },
    priority: {
        type: String,
        enum: [ "low", "medium", "high" ],
        required: [ true, "Priority is required" ]
    },
    status: {
        type: String,
        enum: [ "pending", "completed" ],
        default: "pending"
    },
    completedAt: {
        type: Date,
        default: null
    }
})

const studyPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    interviewReport: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InterviewReport"
    },
    targetRole: {
        type: String,
        required: [ true, "Target role is required" ]
    },
    skillLevel: {
        type: String,
        enum: [ "beginner", "intermediate", "advanced" ],
        required: [ true, "Skill level is required" ]
    },
    hoursPerDay: {
        type: Number,
        required: [ true, "Available hours per day is required" ]
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: [ true, "Deadline is required" ]
    },
    existingSkills: [ { type: String } ],
    missingSkills: [ { type: String } ],
    tasks: [ taskSchema ]
}, {
    timestamps: true
})

const studyPlanModel = mongoose.model("StudyPlan", studyPlanSchema)

module.exports = studyPlanModel