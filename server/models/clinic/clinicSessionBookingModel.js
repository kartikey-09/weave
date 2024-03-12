const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    // -----------------------------------------------Basic Details-----------------------------------------------------
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    whatsappNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        enum: ["online", "in-person"],
        required: true
    },
    description: {
        type: String
    },
    // -------------------------------------Session Booked By (Person) Details----------------------------
    sessionBookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    // -------------------------------------------------Slot-----------------------------------------------
    slot: {
        startTime: {
            type: Date
        },
        endTime: {
            type: Date
        }
    },
    isSlotProvided: {
        type: Boolean
    },
    // -----------------------------------------------Payment----------------------------------------------
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "payments"
    },
    isPaymentDone: {
        type: Boolean
    },
    // -----------------------------------------------Session Completion-----------------------------------
    isSessionCompleted: {
        type: Boolean
    }
}, { timestamps: true });

// pre-save middleware to update isSlotProvided and isPaymentDone field
Schema.pre('save', function (next) {
    // track slot-provided
    if (this.slot.startTime && this.slot.endTime) {
        this.isSlotProvided = true;
    } else {
        this.isSlotProvided = false;
    }

    // track payment done
    if (this.payment) {
        this.isPaymentDone = true;
    } else {
        this.isPaymentDone = false;
    }

    next();
})


const model = mongoose.model("clinic-session-bookings", Schema);
module.exports = model;