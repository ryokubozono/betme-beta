export const ExamFindFilter =(exams, examId) => {
  let exam = '';
  exam = exams.find(c => c.docId === examId)
  return(exam)
}