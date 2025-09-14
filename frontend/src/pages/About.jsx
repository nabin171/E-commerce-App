import React from "react";
import Title from "../components/Title";
const About = () => {
  return (
    <div className="text-2xl text-center pt-8 border-t">
      <Title text1={"ABOUT"} text2={"US"}></Title>
      <div>
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Founded in 2020, we began with a simple mission: to create
                  exceptional digital experiences that make a difference in
                  people's lives. What started as a small team of passionate
                  developers has grown into a thriving company serving customers
                  worldwide.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We believe in the power of innovation, quality, and genuine
                  human connection. Every product we create is designed with
                  care, built with precision, and delivered with pride.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl h-64 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xl font-semibold">Building the Future</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To empower businesses and individuals through innovative
                technology solutions that simplify complexity and enhance
                productivity.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be the leading force in digital transformation, creating a
                world where technology serves humanity's greatest aspirations.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Our Values
              </h3>
              <p className="text-gray-600">
                Integrity, innovation, and excellence guide everything we do. We
                believe in transparency, continuous learning, and putting our
                customers first.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 mb-12 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Team Members</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4+</div>
                <div className="text-blue-100">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">JD</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  John Doe
                </h3>
                <p className="text-blue-500 mb-2">CEO & Founder</p>
                <p className="text-gray-600 text-sm">
                  Visionary leader with 10+ years in tech innovation.
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">JS</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Jane Smith
                </h3>
                <p className="text-purple-500 mb-2">CTO</p>
                <p className="text-gray-600 text-sm">
                  Technical expert passionate about cutting-edge solutions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">MB</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Mike Brown
                </h3>
                <p className="text-green-500 mb-2">Lead Designer</p>
                <p className="text-gray-600 text-sm">
                  Creative mind focused on exceptional user experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Let's discuss how we can help bring your ideas to life.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
