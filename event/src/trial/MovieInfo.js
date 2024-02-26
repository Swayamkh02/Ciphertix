import React, { useState,useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useSearchParams } from 'react-router-dom';


const MovieInfo = ({movie}) => {
    const genAI = new GoogleGenerativeAI('AIzaSyAO1okvZwOjxrtFUX2ZRs2Ak1qhbjSb_VI');
    const [search, setSearch] = useState('');
    const [searchParams] = useSearchParams();
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [grade,setGrade]=useState('');
    useEffect(() =>{
        const formatText = (text) => {
            text = text.replace(/^Grade: \d+\s*/, '');
            const descriptionRegex = /Description:(.*?)(\n|$)/i;
            const match = text.match(descriptionRegex);
            if(match && match[1])
                text = match[1].trim();
            text = text.replace(/\*\*(.*?)\*\*/g, (match, boldText) => {
                return `<strong>${boldText}</strong>`;
            });
            text = text.replace(/## (.*?)(\n|$)/g, (match, headingText) => {
                return `<h2>${headingText}</h2>`;
            });
            // text = `<p class="normal-text">${text}</p>`;
            return text;
        }
        
        function extractGrade(text) {
            // Regular expression to match the grade number
            const gradeRegex = /Grade: (\d+)/;
            // Use the match() method to search for the grade pattern in the text
            const match = text.match(gradeRegex);
            // If a match is found, return the extracted grade number
            if (match && match[1]) {
                return parseInt(match[1]); // Convert the matched string to a number
            } else {
                return null; // Return null if no grade is found in the text
            }
        }
        async function aiRun() {
            setLoading(true);
            setResponse('');
            const safety_settings=[
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_NONE",
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_NONE",
                },
                {
                  "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                  "threshold": "BLOCK_NONE",
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS",
                    "threshold": "BLOCK_NONE",
                },
                {
                  "category": "HARM_CATEGORY_UNSPECIFIED",
                  "threshold": "BLOCK_NONE",
                  },
                  {
                  "category": "HARM_CATEGORY_DEROGATORY",
                  "threshold": "BLOCK_NONE",
                  },
                  {
                  "category": "HARM_CATEGORY_TOXICITY",
                  "threshold": "BLOCK_NONE",
                  },
                  {
                  "category": "HARM_CATEGORY_MEDICAL",
                  "threshold": "BLOCK_NONE",
                  },
                  {
                  "category": "HARM_CATEGORY_SEXUAL",
                  "threshold": "BLOCK_NONE",
                  }           
              ];
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `You have to give a grade between 1 to 10 to the movie : ${movie} put it like  'Grade:' based on the adult content level (more the grade more the adult the movie is -means it cannot be watched by children) Also give a Brief 100 word description of the movie  `;
            const result = await model.generateContent(prompt,safety_settings);
            const response = await result.response;
            console.log(response);
            const text = await formatText(response.candidates[0].content.parts[0].text);
            setGrade(extractGrade(response.candidates[0].content.parts[0].text));
            setResponse(text);
            setLoading(false);
        }
        setSearch(movie);
        console.log(movie);
        aiRun();
    },[]);
    return (
        <div className="movie-info-container">
            {loading && aiResponse === '' ? (
                <p className="mt-3 text-white">Loading ...</p>
            ) : (
                <div className="mt-3">
                    {aiResponse ? (
                        
                        // <div className="text-white" dangerouslySetInnerHTML={{ __html: aiResponse }} />)
                        <div className="text-white">
                            <div className="head-grade">
                                <h2>{search}</h2>
                                <h2 className="grade">{grade}</h2>
                            </div>
                            
                            <p>{aiResponse}</p>
                        </div>
                    ) : (
                        <p className="text-white"> </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MovieInfo;


