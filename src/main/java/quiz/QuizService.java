package quiz;

import javax.ws.rs.Path;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;


@Path("/quiz/")
public class QuizService {

    private static Map<Integer,Quiz> quizHashMap = new HashMap<Integer, Quiz>();


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Quiz> getQuiz() {
        return quizHashMap.values();
    }

    @GET
    @Path("/{quizId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Quiz getQuiz(@PathParam("quizId") int quizId){
        return quizHashMap.get(quizId);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addQuiz(Quiz quiz){
        quizHashMap.put(quiz.getQuizId(),quiz);
    }

    @DELETE
    @Path("/{quizId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteQuiz(Quiz quiz){
        quizHashMap.remove(quiz.getQuizId(),quiz);
    }

}
