import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 bg-gray-900 text-white">
      <div className="grid w-full place-content-center mb-8 lg:mb-0">
        <img
          src="./aboutUs.svg"
          alt="About Us Illustration"
          className="w-[300px] sm:w-[400px] md:w-[450px] lg:w-[600px] mx-auto"
        />
      </div>
      <div className="flex flex-col w-full max-w-2xl space-y-6 text-center lg:text-left">
        <div>
          <h1 className="relative w-fit text-2xl font-bold text-blue-400 before:absolute before:top-[90%] before:h-[3px] before:w-[60%] before:bg-blue-400 lg:text-3xl lg:before:top-full">
            About Us
          </h1>
          <p className="mt-4 text-base md:text-lg leading-relaxed">
            Welcome to <span className="font-bold text-blue-400">FindMyNotes</span>, the ultimate hub for students to seamlessly
            share and access educational resources. Our platform is designed
            to make the exchange of study materials effortless, fostering a
            collaborative academic experience for students across colleges.
          </p>
        </div>
        <div>
          <h1 className="relative w-fit text-2xl font-bold text-blue-400 before:absolute before:top-[90%] before:h-[3px] before:w-[60%] before:bg-blue-400 lg:text-3xl lg:before:top-full">
            Who We Are
          </h1>
          <p className="mt-4 text-base md:text-lg leading-relaxed">
            FindMyNotes is a community-driven initiative fueled by the passion for learning. 
            Founded by a group of dedicated students, our platform is a testament to the belief 
            that education should be a collective journey. Our team comprises tech enthusiasts, 
            educators, and creative minds, all united in the mission to enhance the learning landscape.
          </p>
        </div>
        <div>
          <h1 className="relative w-fit text-2xl font-bold text-blue-400 before:absolute before:top-[90%] before:h-[3px] before:w-[60%] before:bg-blue-400 lg:text-3xl lg:before:top-full">
            Our Mission
          </h1>
          <p className="mt-4 text-base md:text-lg leading-relaxed">
            At FindMyNotes, our mission is clear: to empower students by
            providing a centralized platform where knowledge knows no
            boundaries. We aim to break down the barriers to academic success,
            making valuable study materials accessible to all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
