package quiz;

import java.io.Serializable;
import java.util.Date;

public class Quiz implements Serializable {
    private int quizId;
    private String navn;
    private Sporsmal sporsmal;
    private Date opprettet;
    private int lengde;
    private Date avsluttes;

    public Quiz(){}

    public int getId(){
        return quizId;
    }
    public void setId(int quizId){
        this.quizId = quizId;
    }

    public int getLengde() {
        return lengde;
    }

    public Date getOpprettet() {
        return opprettet;
    }

    public Date getAvsluttes() {
        return avsluttes;
    }

    public void setAvsluttes(Date avsluttes) {
        this.avsluttes = avsluttes;
    }

    public void setOpprettet(Date opprettet) {
        this.opprettet = opprettet;
    }

    public void setLengde(int lengde) {
        this.lengde = lengde;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public Sporsmal getSporsmal() {
        return sporsmal;
    }
    public void setSporsmal(Sporsmal sporsmal) {
        this.sporsmal = sporsmal;
    }
}
