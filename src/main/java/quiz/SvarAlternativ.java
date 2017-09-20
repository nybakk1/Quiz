package quiz;

public class SvarAlternativ {


    private String svaralternativ;
    private boolean riktig;

    public SvarAlternativ(){}
    public String getSvaralternativ() { return svaralternativ; }
    public boolean isRiktig() {
        return riktig;
    }
    public void setRiktig(boolean riktig) {
        this.riktig = riktig;
    }
    public void setSvaralternativ(String svaralternativ) {
        this.svaralternativ = svaralternativ;
    }
}
