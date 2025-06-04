import aboutTestData from "../../test/aboutData.json";

const About = () => {
  console.log(aboutTestData);

  return (
    <div>
      {aboutTestData.map((a, index) => (
        <div key={index}>
          <h2 className="font-bold text-[20px] mb-2">{a.title}</h2>
          <div
            className="font-sans text-[#505050] text-sm font-normal leading-[21px] mb-4 text-justify"
            dangerouslySetInnerHTML={{ __html: a.content }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default About;
