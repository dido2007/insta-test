import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// WAITLIST SCHEMA

const waitListSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["model", "buisness", "admin"],
            default: "model", 
        },
        model: {
            required: false,
            profilePicture: {
                type: String,
                required: true,
            },
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            dateBirth: {
                type: Date,
                required: true,
            },
            nationality: {
                type: String,
                required: true,
            },
            instagram: {
                type: String,
                required: true,
            },
            height: {
                type: Number,
                required: true,
            },
            bust: {
                type: Number,
                required: true,
            },
            waist: {
                type: Number,
                required: true,
            },
            hips: {
                type: Number,
                required: true,
            },
            personalImages: {
                closeUp: {
                    type: String,
                    required: true,
                },
                profile: {
                    type: String,
                    required: true,
                },
            }
        }
    },
)