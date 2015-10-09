class File {
  String nature;
  String parent;
  int number;
  String fileName;
  String title;
  String[] body;
  PrintWriter pw;
  File(String[] file) {
    nature = file[0];
    parent = file[1];
    number = getNumber(file);
    fileName = file[3];
    title = file[4];
    body = new String[file.length - 6];
    for (int i = 6; i < file.length; i++) {
      body[i-6] = file[i];
    }
  }
  int getNumber(String[] file) {
    int num = int(file[2].substring(7,file[2].length()));
    return num;
  }
  int getNumber() {
    return number;
  }
  String getTitle() {
    String t = title.substring(6,title.length());
    return t;
  }
  String getParent() {
    String p = parent.substring(7,parent.length());
    return p;
  }
  String getNature() {
    String n = nature.substring(7,nature.length());
    return n;
  }
  String getFileName() {
    String fn = fileName.substring(9, fileName.length());
    return fn;
  }
  void createHtml(String filename) {
    pw = createWriter(filename);
  }
  void addHtml(String con) {
    pw.println(con);
  }
  void addHtml(String[] con) {
    for (int i = 0; i < con.length; i++) pw.println(con[i]);
  }
  void saveHtml() {
    pw.flush();
    pw.close();
  }
}