package quiz;

public class Sporsmal {
    private String sporsmal;
    private SvarAlternativ[] svarAlternativ;
    private int score;


    public Sporsmal(){}
    public String getSporsmal() {
        return sporsmal;
    }
    public void setSporsmal(String sporsmal) {
        this.sporsmal = sporsmal;
    }
    public SvarAlternativ[] getSvarAlternativ() {
        return svarAlternativ;
    }
    public void setSvarAlternativ(SvarAlternativ[] svarAlternativ) { this.svarAlternativ = svarAlternativ; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
}
