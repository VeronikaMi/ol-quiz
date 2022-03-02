export const tempData = {
  questions: [
    {
      id: 1,
      type: "single",
      question: "ერთპასუხიანი კითხვა",
      options: [
        "სავარაუდო პასუხი 1",
        "სავარაუდო პასუხი 2",
        "სავარაუდო პასუხი 3",
        "სავარაუდო პასუხი 4",
      ],
    },
    {
      id: 2,
      type: "multiple",
      question: "მრავალპასუხიანი კითხვა",
      options: [
        "სავარაუდო პასუხი 3",
        "სავარაუდო პასუხი 1",
        "სავარაუდო პასუხი 4",
        "სავარაუდო პასუხი 2",
      ],
    },
    {
      id: 3,
      type: "boolean",
      question: "დისკრეტული კითხვა",
    },
  ],
  answers: [
    {
      id: 1,
      answer: 3,
    },
    {
      id: 2,
      answer: [2, 4],
    },
    {
      id: 3,
      answer: true,
    },
  ],
};