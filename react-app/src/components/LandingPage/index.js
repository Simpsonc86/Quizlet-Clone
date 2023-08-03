import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllFoldersThunk } from "../../store/folders"
import { getAllSetsThunk } from "../../store/sets"
import { getAllQuestionsThunk } from "../../store/questions"
import "./LandingPage.css"
import { NavLink } from "react-router-dom"


export default function LandingPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllFoldersThunk())
            .then(dispatch(getAllSetsThunk()))
            .then(dispatch(getAllQuestionsThunk()))
    }, [dispatch])

    return (
        <div className="landing-page-container">
            <div className="landing-page-inner">
                <div className="landing-page-info">
                    <h1 className="set-text">The best digital flashcards and study tools</h1>
                    <p className="set-text-small">Join a growing list of students using Wizlet's science-backed flashcards, practice tests and expert solutions to improve their grades and reach their goals.</p>
                    <NavLink className="nav-link get-started" to="/signup">Get Started</NavLink>
                </div>
                <img className="landing-page-img" alt="home-logo" src="AF_3125X1586_1-min_2_2-3124x1562.png" />
            </div>
        </div>
    )
}