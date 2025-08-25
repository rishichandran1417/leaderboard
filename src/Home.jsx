"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function StartupCard({ title, description, image="startup.png", index, link }) {

  const bgColor = "white"
  const textColor = "#1E40AF"
  const descriptionColor = "#374151"

  const CardContent = (
    <motion.div
      className="rounded-xl overflow-hidden w-96 flex flex-col border border-blue-500 cursor-pointer"
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.2 },
      }}
    >
      <div>
        <img src={image} alt={title} className="w-full h-full object-fit rounded-t-lg p-4" />
      </div>
      <div className="p-5 pr-6">
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-blue-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-sm mb-4 w-[90%]"
          style={{ color: descriptionColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );

  return link ? (
    <Link to={link} style={{ textDecoration: "none" }}>
      {CardContent}
    </Link>
  ) : CardContent;
}

export default function Home() {
  const Startups = [
    {
      title: "Startuo Bootcamp",
      date: "2023-10-01",
      image: "ideabox.jpg",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
      link: "/ideacamp"
    },
    {
      title: "IdeaBox ",
      date: "2023-10-01",
      image: "ideabox.jpg",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
      link: "/leaderboard"
    },
  
   
    // Add more startups as needed
  ]

  const bgColor = "white"
  const textColor = "#1E40AF"

  return (
    <div className="mx-auto">
      <motion.div
        className="flex flex-col items-start justify-start p-4 sm:p-8 md:p-16 lg:p-40 min-h-screen overflow-hidden"
        style={{ backgroundColor: bgColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-[#0732EF] ml-4 md:ml-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Leaderboards
        </motion.h1>

        <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 mt-6 md:mt-10 p-2 md:p-10 w-full">
          {Startups.map((startup, index) => (
            <StartupCard
              key={index}
              index={index}
              title={startup.title}
              description={startup.content}
              image={startup.image}
              link={startup.link}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
