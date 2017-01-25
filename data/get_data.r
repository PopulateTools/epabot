library(MicroDatosEs)

download.file("ftp://www.ine.es/temas/epa/datos_3t16.zip", destfile = "datos_3t16.zip")
unzip("datos_3t16.zip", exdir = "./")

# Read microdata
epa <- epa2005("datos_3t16")
epa <- as.data.frame(epa)

# Column info here: ftp://www.ine.es/temas/epa/disereg_epa0516.zip
data <- subset(epa, select = c(PROV, EDAD, SEXO, ECIV, NAC, EXREGNA, ANORE, NFORMA, OCUP, SITU, DUCON1, DCOM, PARCO1, HORASP, DISP, RZNDIS, DTANT, ITBU, OCUPA, OFEMP, SIDAC1))

write_csv(data, "data.csv")
# write_csv(head(data, 100), "data_small.csv")
