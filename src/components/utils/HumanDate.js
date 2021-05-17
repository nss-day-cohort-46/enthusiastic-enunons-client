export const HumanDate = () => {
    
    return new Date().toLocaleDateString("en-US",
    {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Chicago'
    })
}