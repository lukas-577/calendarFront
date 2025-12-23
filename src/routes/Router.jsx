import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { ProtectedRute } from '../components/ProtectedRute'
import Home from '../pages/Home/Home'
import MyCalendar1 from '../pages/Calendar/Calendar1'
import MyCalendar2 from '../pages/Calendar/Calendar2'
import Lugares from '../pages/Lugares/Lugares'


const Router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children:[
            {
                path: "/",
                element:
                    <Home></Home>
            },
            {
                path: "/calendario",
                element:
                    <MyCalendar1></MyCalendar1>
            },
            {
                path: "/calendario2",
                element:
                    <MyCalendar2></MyCalendar2>
            },
            {
                path: "/lugares",
                element:
                    <Lugares></Lugares>
            },
        ]
    }
])

export default Router