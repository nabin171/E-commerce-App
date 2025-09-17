import contactModel from "../models/contactModel.js";
// Save contact form data
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new contactModel({ name, email, subject, message });
    await contact.save();

    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { submitContactForm };
