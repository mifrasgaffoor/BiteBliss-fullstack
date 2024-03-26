
import img from "../assets/img/about.png";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 lg:pt-0 pt-20">
      <img
        src={img}
        alt="About"
        className="lg:w-1/3 lg:mr-12 mb-8 lg:mb-0 rounded-lg shadow-lg"
      />
      <div className="lg:w-2/3 space-y-4">
        <h1 className="font-semibold text-4xl text-center md:text-left">
          Who We Are?
        </h1>
        <p className="text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          architecto quisquam delectus minima perferendis nulla quia nisi
          laborum, exercitationem cum quo accusantium, impedit sed. Dicta, quo
          molestias omnis reprehenderit quae animi? Explicabo quasi accusamus
          laboriosam temporibus delectus, aut a? Quasi?
        </p>
        <p className="text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi,
          suscipit reiciendis accusamus recusandae eum aspernatur pariatur odit
          veritatis facere. Magnam!
        </p>
        <div className="flex justify-center lg:justify-start">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300 lg:mb-0 mb-6"> 
            Click to more
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
