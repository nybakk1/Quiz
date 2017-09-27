package quiz;


import sun.security.provider.ConfigFile;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Path("/scoreboard/")
public class ScoreboardService {

    public static Map<Integer,Scoreboard> scoreboardMap = new HashMap<Integer, Scoreboard>();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Scoreboard> getScoreboard() {
        return scoreboardMap.values();
    }

    @GET
    @Path("/{qid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Scoreboard getScoreboard(@PathParam("qid") int qid){
        return scoreboardMap.get(qid);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void setScoreboard(Scoreboard scoreboard){
        scoreboardMap.put(scoreboard.getQid(),scoreboard);
    }

    @DELETE
    @Path("/{qid}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteScoreboard(Scoreboard scoreboard){
        scoreboardMap.remove(scoreboard.getQid(),scoreboard);
    }
}
