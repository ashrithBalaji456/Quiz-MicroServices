package com.Balu.quiz_service.Controller;

import com.Balu.quiz_service.Model.QuestionWrapper;
import com.Balu.quiz_service.Model.QuizDto;
import com.Balu.quiz_service.Model.Responce;
import com.Balu.quiz_service.Service.QuizService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;
    @PostMapping("create")
    public ResponseEntity<String> createQuiz(@RequestBody QuizDto quizDto){
        return quizService.createQuiz(quizDto.getCategoryName(),quizDto.getNumOfQuestion(),quizDto.getTitle());

    }
    @PostMapping("get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id){
        return quizService.getQuestions(id);
    }
    @PostMapping("score/{id}")
    public ResponseEntity<Integer> getScore(@RequestBody List<Responce> response,@PathVariable Integer id){
        return quizService.getScore(id,response);
    }
}
