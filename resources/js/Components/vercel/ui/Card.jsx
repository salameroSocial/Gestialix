// import React from 'react'

// // export default function Card({ children }) {
// //     return (
// //         <div className="bg-white shadow rounded-lg overflow-hidden">
// //             {children}
// //             <h1>Card</h1>
// //         </div>
// //     )
// // }


// export const Card = ({ className, ...props }) => (
//     <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
// )

// export const CardHeader = ({ className, ...props }) => (
//     <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
// )

// export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
//     <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
// ))
// CardTitle.displayName = 'CardTitle'

// export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
//     <p ref={ref} className={`text-sm text-muted-foreground ${className}`} {...props} />
// ))
// CardDescription.displayName = 'CardDescription'

// export const CardContent = ({ className, ...props }) => (
//     <div className={`p-6 pt-0 ${className}`} {...props} />
// )

// export default { Card, CardHeader, CardTitle, CardDescription, CardContent }

import * as React from "react"

const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`flex flex-col space-y-1.5 p-6 ${className}`}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={`text-sm text-muted-foreground ${className}`}
        {...props}
    />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`flex items-center p-6 pt-0 ${className}`}
        {...props}
    />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }