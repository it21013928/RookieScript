import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Radio, Card, Button, Typography } from "@material-tailwind/react";

function roadmapPage() {
  const [lessons, setLessons] = useState(null);
  const [xpLevel, setXpLevel] = useState("");
  const [multiLang, setMultiLang] = useState("");
  const [preferredLang, setPreferredLang] = useState("");
  const [interLearning, setInterLearning] = useState("");

  //fetch all lessons
  const fetchLessons = async () => {
    const response = await Axios.get("http://localhost:7000/api/lesson/");
    setLessons(response.data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  //submit the selected values
  const handleSubmitQuesForm = async () => {
    console.log("Selected Experience Level:", xpLevel);
    console.log("Open to Learn Multiple Languages:", multiLang);
    console.log("Preferred Language:", preferredLang);
    console.log("Prefer Interactive Learning:", interLearning);

    try {
      // Filter lessons
      const filteredLessons = lessons.filter((lesson) => {
        const xpLevelMatch =
          lesson.xpLevel === xpLevel ||
          lesson.xpLevel === xpLevel.toLowerCase();

        const multiLangMatch = multiLang.toLowerCase() === "yes";

        const preferredLangMatch =
          lesson.language === preferredLang ||
          lesson.language === preferredLang.toLowerCase();

        if (multiLangMatch) {
          return xpLevelMatch;
        } else {
          return xpLevelMatch && preferredLangMatch;
        }
      });

      console.log("Lessons:", filteredLessons);
    } catch (error) {
      console.error("Error querying the database:", error);
    }
  };

  return (
    <div className=" pb-40">
      <section className="section py-14" id="home">
        {/* intro container */}
        <div className="container">
          <div className="lg:flex justify-center">
            <div className="lg:w-3/3 mx-2">
              <div className="text-center">
                <h1 className="text-6xl font-semibold leading-[70px] tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600 mb-10">
                  Welcome to Roadmap
                </h1>
                <p className="text-base text-gray-400 mb-10">
                  This Roadmap is a powerful tools that provide a structured and
                  visual representation of a plan or strategy. They serve as
                  invaluable guides for individuals, teams, and organizations,
                  helping them navigate their journey towards specific goals and
                  objectives. Whether you're embarking on a complex project,
                  managing a product development cycle, or charting your
                  personal career growth, roadmaps help you stay organized,
                  focused, and on track. By breaking down long-term goals into
                  manageable steps and providing a sense of direction, roadmaps
                  enable effective planning, communication, and progress
                  tracking, ultimately facilitating successful outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* question title container */}
        <div className="container">
          <div className="lg:flex justify-center">
            <div className="lg:w-3/3 mt-2">
              <div className="text-center">
                <h1 className="text-4xl font-semibold leading-[100px] tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600">
                  Answer these questions to get started
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* question form */}
        <div className="lg:flex justify-center">
          <Card color="transparent" shadow={false}>
            <form className="mt-2 mb-2 max-w-screen-lg sm:w-150">
              <Typography
                color="gray"
                className="mt-1 font-normal text-center text-lg font-bold"
              >
                What is your current programming experience level?
              </Typography>
              <div className="flex gap-2 text-center items-center">
                <Radio
                  name="xpLevel"
                  label="Beginner"
                  checked={xpLevel === "Beginner"}
                  onChange={() => setXpLevel("Beginner")}
                />

                <Radio
                  name="xpLevel"
                  label="Intermediate"
                  checked={xpLevel === "Intermediate"}
                  onChange={() => setXpLevel("Intermediate")}
                />

                <Radio
                  name="xpLevel"
                  label="Advanced"
                  checked={xpLevel === "Advanced"}
                  onChange={() => setXpLevel("Advanced")}
                />
              </div>

              <Typography
                color="gray"
                className="mt-1 font-normal text-center text-lg font-bold"
              >
                Are you open to learning multiple programming languages if they
                align with your goals?
              </Typography>
              <div className="flex gap-2 items-center">
                <Radio
                  name="multiLang"
                  label="Yes"
                  checked={multiLang === "Yes"}
                  onChange={() => setMultiLang("Yes")}
                />
                <Radio
                  name="multiLang"
                  label="No"
                  checked={multiLang === "No"}
                  onChange={() => setMultiLang("No")}
                />
              </div>

              <Typography
                color="gray"
                className="mt-1 font-normal text-center text-lg font-bold"
              >
                Are you interested in a specific programming language?
              </Typography>
              <div className="flex gap-10">
                <Radio
                  name="preferredLang"
                  label="Java"
                  checked={preferredLang === "Java"}
                  onChange={() => setPreferredLang("Java")}
                />
                <Radio
                  name="preferredLang"
                  label="Python"
                  checked={preferredLang === "Python"}
                  onChange={() => setPreferredLang("Python")}
                />
              </div>

              <Typography
                color="gray"
                className="mt-1 font-normal text-center text-lg font-bold"
              >
                Do you prefer interactive learning platforms, such as coding
                challenges and hands-on exercises?
              </Typography>
              <div className="flex gap-10">
                <Radio
                  name="interLearning"
                  label="Yes"
                  checked={interLearning === "Yes"}
                  onChange={() => setInterLearning("Yes")}
                />
                <Radio
                  name="interLearning"
                  label="No"
                  checked={interLearning === "No"}
                  onChange={() => setInterLearning("No")}
                />
              </div>

              <Button
                className="mt-3 bg-black w-max h-12 text-white py-1 px-8 rounded-md center"
                fullWidth
                onClick={handleSubmitQuesForm}
              >
                Submit my Answers
              </Button>
            </form>
          </Card>
        </div>

        {/* lesson container */}
      </section>
    </div>
  );
}

export default roadmapPage;
