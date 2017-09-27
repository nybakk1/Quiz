package quiz;



public class Scoreboard {

    private int qid;
    private Spiller[] spiller;

    public int getQid() {
        return qid;
    }

    public void setQid(int qid) {
        this.qid = qid;
    }

    public Spiller[] getSpiller() {
        return spiller;
    }

    public void setSpiller(Spiller[] spiller) {
        this.spiller = spiller;
    }
}
