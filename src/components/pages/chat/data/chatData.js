// ── Toggle this to switch between empty state and chat content ──
// true  = shows empty state (no mentor)
// false = shows mentor list and chat
export const SHOW_CHAT_EMPTY_STATE = false;

export const C = {
red:   "#CF173C",
navy:  "#312F61",
dark:  "#1B1A23",
grey:  "#616E7C",
redBg: "#FFEDED",
};

export const MENTORS = SHOW_CHAT_EMPTY_STATE ? [] : [
{
id: 1,
name: "Daniel Francis",
role: "Head of Marketing",
avatar: "/meetingman.png",
online: true,
time: "13:55 pm",
messages: [
    { id: 1, from: "them", text: "We will be working with that then", time: "Yesterday, 12:03 pm" },
    { id: 2, from: "me",   text: "Good morning sir, sorry for the late response", time: "9:06 am" },
    { id: 3, from: "them", text: "Good morning, how are you doing?", time: "10:00 am" },
    { id: 4, from: "me",   text: "I am doing fine, Thank you, a reminder that we will have a meeting today", time: "10:25 am" },
],
},
{
id: 2,
name: "Daniel Francis",
role: "Head of Marketing",
avatar: "/meetingman2.png",
online: false,
time: "13:55 pm",
messages: [
    { id: 1, from: "them", text: "Hello, hope you are doing well?", time: "9:00 am" },
],
},
];

export const OTHER_GROUPS = [
{
id: 1,
name: "Success Seekers Network",
avatar: "/groupchatprofilepic.png",
participants: 20,
members: 14,
mentors: 6,
time: "10:05 am",
description:
    "Join us in discussions on goal-setting, self-improvement, career development, and more.",
messages: [
    { id: 1, sender: "Lovely Daniel", text: "We will be working with that then", time: "12:03 pm" },
    { id: 2, sender: "Kingsley Sam",  text: "We will be working with that then We will be working with that then", time: "12:04 pm" },
    { id: 3, sender: "Mariam Sunday", text: "We will be working with that then We will be working with that then", time: "12:04 pm" },
    { id: 4, sender: "Lovely Daniel", text: "We will be working with that then", time: "12:03 pm" },
    { id: 5, sender: "me",            text: "I am doing fine, Thank you, a reminder that we will have a meeting today", time: "10:05 am" },
],
},
{
id: 2, name: "Success Seekers Network", avatar: "/groupchatprofilepic.png",
participants: 20, members: 14, mentors: 6, time: "10:08 am",
description: "A community for seekers.", messages: [],
},
{
id: 3, name: "Success Seekers Network", avatar: "/groupchatprofilepic.png",
participants: 20, members: 14, mentors: 6, time: "10:06 am",
description: "A community for seekers.", messages: [],
},
];