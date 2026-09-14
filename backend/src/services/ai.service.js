const { GoogleGenAI, Type } = require("@google/genai")
const puppeteer = require("puppeteer")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportGeminiSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: { type: Type.NUMBER, description: "A score between 0 and 100 indicating how well the candidate's profile matches the job" },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question that can be asked in the interview" },
                    intention: { type: Type.STRING, description: "The intention of the interviewer behind asking this question" },
                    answer: { type: Type.STRING, description: "How to answer this question, what points to cover, what approach to take" }
                },
                required: [ "question", "intention", "answer" ]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral question that can be asked in the interview" },
                    intention: { type: Type.STRING, description: "The intention of the interviewer behind asking this question" },
                    answer: { type: Type.STRING, description: "How to answer this question, what points to cover, what approach to take" }
                },
                required: [ "question", "intention", "answer" ]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "List of skill gaps in the candidate's profile along with their severity",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The skill which the candidate is lacking" },
                    severity: { type: Type.STRING, enum: [ "low", "medium", "high" ], description: "The severity of this skill gap" }
                },
                required: [ "skill", "severity" ]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan for the candidate to follow",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.NUMBER, description: "The day number in the preparation plan, starting from 1" },
                    focus: { type: Type.STRING, description: "The main focus of this day in the preparation plan" },
                    tasks: {
                        type: Type.ARRAY,
                        description: "List of tasks to be done on this day",
                        items: { type: Type.STRING }
                    }
                },
                required: [ "day", "focus", "tasks" ]
            }
        },
        title: { type: Type.STRING, description: "The title of the job for which the interview report is generated" }
    },
    required: [ "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title" ]
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        Generate at least 5 technical questions, 5 behavioral questions,
                        3 skill gaps, and a 7-day preparation plan.
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportGeminiSchema,
        }
    })

    console.log("RAW GEMINI RESPONSE (interview report):", response.text)

    return JSON.parse(response.text)

}



async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfGeminiSchema = {
        type: Type.OBJECT,
        properties: {
            html: { type: Type.STRING, description: "The HTML content of the resume which can be converted to PDF using any library like puppeteer" }
        },
        required: [ "html" ]
    }

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: resumePdfGeminiSchema,
        }
    })

    console.log("RAW GEMINI RESPONSE (resume pdf):", response.text)

    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}
const studyPlanGeminiSchema = {
    type: Type.OBJECT,
    properties: {
        tasks: {
            type: Type.ARRAY,
            description: "Day-by-day study tasks for the preparation plan",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.NUMBER, description: "The day number this task belongs to, starting from 1" },
                    title: { type: Type.STRING, description: "Short title of the task" },
                    description: { type: Type.STRING, description: "What the candidate should specifically do for this task" },
                    skill: { type: Type.STRING, description: "The skill or topic this task addresses" },
                    estimatedHours: { type: Type.NUMBER, description: "Estimated hours required to complete this task" },
                    priority: { type: Type.STRING, enum: [ "low", "medium", "high" ], description: "Priority of this task based on how critical the skill is for the target role" }
                },
                required: [ "day", "title", "description", "skill", "estimatedHours", "priority" ]
            }
        }
    },
    required: [ "tasks" ]
}

async function generateStudyPlan({ targetRole, skillLevel, hoursPerDay, deadlineDays, existingSkills, missingSkills }) {

    const prompt = `Generate a realistic day-by-day study plan for a candidate preparing for the following role.

                        Target Role: ${targetRole}
                        Current Skill Level: ${skillLevel}
                        Available Study Time: ${hoursPerDay} hours/day
                        Preparation Deadline: ${deadlineDays} days

                        Existing Skills: ${existingSkills.join(", ") || "None specified"}
                        Missing/Weak Skills to focus on: ${missingSkills.join(", ") || "None specified"}

                        Distribute tasks realistically across all ${deadlineDays} days. The sum of estimatedHours
                        for tasks on the same day should not exceed ${hoursPerDay} hours.
                        Prioritize the missing skills earlier and more heavily, weighted by how critical they are for the target role.
                        Do not leave any day empty — every day should have at least one task.
                        Generate practical, specific tasks, not vague advice — e.g. "Build a CRUD REST API using Express and MongoDB"
                        rather than "Learn backend development".
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: studyPlanGeminiSchema,
        }
    })

    console.log("RAW GEMINI RESPONSE (study plan):", response.text)

    const parsed = JSON.parse(response.text)

    if (!parsed.tasks || !Array.isArray(parsed.tasks) || parsed.tasks.length === 0) {
        throw new Error("AI failed to generate a valid study plan.")
    }

    return parsed.tasks

}

module.exports = { generateInterviewReport, generateResumePdf,generateStudyPlan }