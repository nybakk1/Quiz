package quiz;

public class Sporsmal {
    private String sporsmal;
    private SvarAlternativ[] svarAlternativ;
    private int score;
    private int riktigSvar;
    private int lengde;
    private String imgUrl;


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

    public int getRiktigSvar() {
        return riktigSvar;
    }

    public void setRiktigSvar(int riktigSvar) {
        this.riktigSvar = riktigSvar;
    }

    public int getLengde() { return lengde;}

    public void setLengde(int lengde){ this.lengde = lengde; }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
