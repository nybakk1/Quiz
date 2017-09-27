package quiz;


import java.util.ArrayList;
import java.util.List;

public class Scoreboard {

    private int qid;
    private List<Spiller> spiller;

    public int getQid() {
        return qid;
    }

    public void setQid(int qid) {
        this.qid = qid;
    }

    public List<Spiller> getSpiller() {
        return spiller;
    }

    public void setSpiller(List<Spiller> spiller) {
        this.spiller = spiller;
    }
}
