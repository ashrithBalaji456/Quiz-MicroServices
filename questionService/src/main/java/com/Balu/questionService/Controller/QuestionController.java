package com.Balu.questionService.Controller;

import com.Balu.questionService.Service.QuestionService;
import com.Balu.questionService.models.Question;


import com.Balu.questionService.models.QuestionWrapper;
import com.Balu.questionService.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question")
public class QuestionController {
    @Autowired
    QuestionService questionService;


    @GetMapping("allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        return questionService.getAllQuestions();
    }

    @GetMapping("getByCategory/{category}")
    public  ResponseEntity<List<Question>> getByCategory(@PathVariable String category){
        return questionService.getByCategory(category);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addQuestions(@RequestBody Question question){
        return questionService.addQuestion(question);
    }

    @GetMapping("generate")
    public ResponseEntity<List<Integer>> getQuestionsForQuiz(@RequestParam String category,@RequestParam int numQue){
        return questionService.getForQuiz(category,numQue);
    }

    @PostMapping("getById")
    public ResponseEntity<List<QuestionWrapper>> getQuistionById(@RequestBody List<Integer> questionIds){
        return questionService.getQuestionById(questionIds);
    }

    @PostMapping("getScore")
    public ResponseEntity<Integer> getScore(@RequestBody List<Response>responses){
        return questionService.getScore(responses);
    }

}
