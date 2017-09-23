package quiz;

import java.io.Serializable;
import java.util.Date;

public class Quiz implements Serializable {
    private int quizId;
    private String navn;
    private Sporsmal[] sporsmal;
    private Date opprettet;
    private Date start;
    private Date avsluttes;

    public Quiz(){}

    public int getQuizId(){
        return quizId;
    }
    public void setQuizId(int quizId){
        this.quizId = quizId;
    }

    public String getNavn() {
        return navn;
    }
    public void setNavn(String navn) {
        this.navn = navn;
    }


    public Sporsmal[] getSporsmal() { return sporsmal; }
    public void setSporsmal(Sporsmal[] sporsmal) {
        this.sporsmal = sporsmal;
    }


    public Date getOpprettet() {
        return opprettet;
    }
    public void setOpprettet(Date opprettet) {
        this.opprettet = opprettet;
    }


    public Date getStart() { return start; }
    public void setStart(Date start) {
        this.start = start;
    }


    public Date getAvsluttes() {
        return avsluttes;
    }
    public void setAvsluttes(Date avsluttes) {
        this.avsluttes = avsluttes;
    }


}
