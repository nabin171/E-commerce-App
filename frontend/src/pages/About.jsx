// About.jsx
import React from "react";
import Title from "../components/Title";
import {
  Sparkles,
  BookOpen,
  Target,
  Users,
  Globe,
  Briefcase,
  Mail,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pb-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-white/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                We craft experiences people love
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Since 2020 we've focused on building thoughtful products that
                solve real problems. We blend design, engineering and strategy
                to create delightful, reliable digital experiences for users
                around the world.
              </p>
              <p className="text-gray-600">
                Our approach is simple: listen to users, iterate quickly, and
                ship with quality. That’s how small teams create big outcomes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl h-64 flex items-center justify-center">
              <div className="text-white text-center px-6">
                <BookOpen className="w-12 h-12 mx-auto mb-3" />
                <p className="text-xl font-semibold">Built on knowledge</p>
                <p className="mt-2 text-sm opacity-90">
                  Research-driven and data-informed decisions power everything
                  we build.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6 text-center border border-white/20">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mission</h3>
            <p className="text-gray-600 text-sm">
              Empower teams and creators with tools that simplify complex
              workflows and spark creativity.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center border border-white/20">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Vision</h3>
            <p className="text-gray-600 text-sm">
              To be a trusted partner for businesses worldwide — where great
              design and engineering unlock real value.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center border border-white/20">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Values</h3>
            <p className="text-gray-600 text-sm">
              Integrity, craftsmanship, empathy and continuous improvement —
              always putting people first.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 mb-10 text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">500+</div>
              <div className="opacity-90 mt-1">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">1,000+</div>
              <div className="opacity-90 mt-1">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">50+</div>
              <div className="opacity-90 mt-1">Team Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold">4+</div>
              <div className="opacity-90 mt-1">Years of Excellence</div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-white/20">
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow">
                NK
              </div>
              <h3 className="text-xl font-semibold">Nabin Karki</h3>
              <p className="text-blue-500 mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Vision and strategy for product and growth.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow">
                JS
              </div>
              <h3 className="text-xl font-semibold">Ravin Thapa</h3>
              <p className="text-purple-500 mb-2">CTO</p>
              <p className="text-gray-600 text-sm">
                Leads engineering and technical roadmap.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow">
                MB
              </div>
              <h3 className="text-xl font-semibold">Shyam Sharma</h3>
              <p className="text-green-500 mb-2">Head of Design</p>
              <p className="text-gray-600 text-sm">
                Shapes product experience and visual identity.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white rounded-2xl shadow-lg p-8 text-center border border-white/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to build something great?
          </h2>
          <p className="text-gray-600 mb-6">
            Whether you have a project or just want to say hi, we’d love to hear
            from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r bg-gray-900  text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-xl transition transform hover:scale-[1.02]"
            >
              <Briefcase className="w-4 h-4" />
              Let's talk
            </a>

            <a
              href="mailto:hello@yourdomain.com"
              className="inline-flex items-center gap-3 border border-gray-200 px-6 py-3 rounded-xl text-gray-800 hover:bg-gray-50 transition"
            >
              <Mail className="w-4 h-4" />
              hello@yourdomain.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
