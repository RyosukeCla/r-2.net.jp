class Manager {
  ArrayList<File> f;
  String[] indexData;
  String[] model0;
  String[] model1;
  String[] model2;
  String[] model3;
  String[] model4;
  String[] model5;
  String[] index0;
  String[] index1;
  String[] index2;
  Manager() {  
    println("please wait...");
    f = new ArrayList<File>();
    println("now loading modelData");
    loadModel();
    println("now loading index.txt");
    loadIndex();
    println("now loading hpdata");
    for (int i = 0; i < indexData.length; i++) {
      f.add(new File(loadFile(indexData[i])));
      println("  loaded " + indexData[i]);
    }
    println("now creating html");
    for (int i = 0; i < f.size (); i++) {
      toHtml(f.get(i));
      println("  created " + f.get(i).getTitle() + ".html");
    }
    println("completed!");
  }

  Manager(String fileName) {
    PrintWriter c = createWriter("hpdata/"+fileName+".txt");
    c.println("nature:");
    c.println("parent:");
    c.println("number:");
    c.println("fileName:");
    c.println("title:");
    c.println("body:");
    c.flush();
    c.close();
  }

  void loadModel() {
    model0 = loadStrings("modelData/model0.html");
    model1 = loadStrings("modelData/model1.html");
    model2 = loadStrings("modelData/model2.html");
    model3 = loadStrings("modelData/model3.html");
    model4 = loadStrings("modelData/model4.html");
    model5 = loadStrings("modelData/model5.html");
    index0 = loadStrings("modelData/index0.html");
    index1 = loadStrings("modelData/index1.html");
    index2 = loadStrings("modelData/index2.html");
  }

  void loadIndex() {
    indexData = loadStrings("hpdata/index.txt");
  }

  String[] loadFile(String fileName) {
    String[] lf = loadStrings("hpdata/"+fileName);
    return lf;
  }

  void toHtml(File file) {
    if (file.getFileName().equals("index")) {
      file.createHtml("hp/" + file.getFileName() + ".html");
      file.addHtml(index0);
      file.addHtml("<title>R^2 - " + file.getTitle() + "</title>");
      file.addHtml(index1);
      file.addHtml(mainMenu(file));
      file.addHtml(index2);
    } else {
      if (file.getParent().equals("none")) {
        file.createHtml("hp/" + file.getFileName() + ".html");
      } else {
        file.createHtml("hp/"+familyTree(file)+file.getFileName()+".html");
      }
      file.addHtml(model0);
      file.addHtml("<title>R^2 - " + file.getTitle() + "</title>");
      file.addHtml(model1);
      if (file.getParent().equals("none")) {
        file.addHtml(mainMenu(file));
      } else {
        file.addHtml(mainMenu(ancestorFile(file)));
      }
      file.addHtml(model2);
      file.addHtml("<h1 class=\"head-title\">"+file.getTitle()+"</h1>");
      file.addHtml(file.body);
      file.addHtml(model3);
      sideMenu(file);
      file.addHtml(model4);
      backNext(file);
      file.addHtml(model5);
    }
  }

  File parentFile(File file) {
    for (int i = 0; i < f.size(); i++) {
      if (file.getParent().equals(f.get(i).getFileName())) {
        return f.get(i);
      }
    }
    return null;
  }

  File ancestorFile(File file) {
    File fam = file;
    for (int i = 0; i < f.size (); i++) {
      if (fam.getParent().equals(f.get(i).getFileName())) {
        if (fam.getFileName().equals(f.get(i).getFileName())==false) {
          fam = f.get(i);
        }
      }
    }
    return fam;
  }

  String familyTree(File file) {
    File fam = file;
    String tree;
    StringBuilder sb = new StringBuilder();
    sb.append("");
    for (int j = 0; j < f.size (); j++) {
      if (fam.getParent().equals("none")) {
        tree = new String(sb);
        return tree;
      }
      for (int i = 0; i < f.size (); i++) {
        if (fam.getParent().equals(f.get(i).getFileName())) {
          if (fam.getFileName().equals(f.get(i).getFileName())==false) {
            sb.insert(0, f.get(i).getFileName()+"/");
            fam = f.get(i);
          }
        }
      }
    }
    return null;
  }

  String[] mainMenu(File file) {
    int n = 0;
    for (int i = 0; i < f.size(); i++) {
      if (f.get(i).getParent().equals("none")) {
        n++;
      }
    }
    String[] sm = new String[n];
    for (int i = 0; i < f.size(); i++) {
      if (f.get(i).getParent().equals("none")) {
        if (file.getFileName().equals(f.get(i).getFileName()) || file.getParent().equals("none")) {
          sm[f.get(i).getNumber()] = "<li class=\"forcused\"><a href=\"http://ryosukecla.github.io./r-2.net.jp/" + f.get(i).getFileName() + "\".html>" + f.get(i).getTitle() + "</a></li>";
        } else {
          sm[f.get(i).getNumber()] = "<li class=\"unforcused\"><a href=\"http://ryosukecla.github.io./r-2.net.jp/" + f.get(i).getFileName() + "\".html>" + f.get(i).getTitle() + "</a></li>";
        }
      }
    }
    return sm;
  }

  String[] sideMenu(File file) {
    int n = 0;
    if (file.getNature().equals("child")) {
      for (int i = 0; i < f.size (); i++) {
        if (file.getParent().equals(f.get(i).getFileName())) {
          n++;
        }
        if (file.getParent().equals(f.get(i).getParent())) {
          n++;
        }
      }
      String[] sm = new String[n];
      for (int i = 0; i < f.size (); i++) {
        if (file.getParent().equals(f.get(i).getFileName())) {
          sm[0] = "<li class=\"unforcused parent\"><a href=\"http://ryosukecla.github.io./r-2.net.jp/"+familyTree(file)+".html\">"+f.get(i).getTitle()+"</a><li>";
        }
        if (file.getParent().equals(f.get(i).getParent())) {
          if (file.getFileName().equals(f.get(i).getFileName())) {
            sm[f.get(i).getNumber()+1] = "<li class=\"forcused self\"><a href=\"http://ryosukecla.github.io./r-2.net.jp/"+familyTree(file)+f.get(i).getFileName()+".html\">"+f.get(i).getTitle()+"</a></li>";
          } else {
            sm[f.get(i).getNumber()+1] = "<li class=\"unforcused child\"><a href=\"http://ryosukecla.github.io./r-2.net.jp/"+familyTree(file)+f.get(i).getFileName()+".html\">"+f.get(i).getTitle()+"</a></li>";
          }
        }
      }
      return sm;
    } else {
      for (int i = 0; i < f.size (); i++) {
        if (file.getTitle().equals(f.get(i).getParent())) {
          n++;
        }
        if (file.getParent().equals(f.get(i).getFileName())) {
          n++;
        }
        if (file.getFileName().equals(f.get(i).getFileName())) {
          n++;
        }
      }
      String[] sm = new String[n+1];
      for (int i = 0; i < sm.length; i++) {
        sm[i] = "";
      }
      for (int i = 0; i < f.size (); i++) {
        if (file.getParent().equals(f.get(i).getFileName())) {
          sm[0] = "<li class=\"unforcused parent\"><a href=\"http://ryosukecla.github.io./r-2.net.jp/"+familyTree(f.get(i))+f.get(i).getFileName()+".html\">"+f.get(i).getTitle()+"</a></li>";
        } else {
          sm[0] ="";
        }
        if (file.getFileName().equals(f.get(i).getFileName())) {
          sm[1] = "<li class=\"forcused self\"><a href=\"http://ryosukecla.github.io./r-2.net.jp/"+familyTree(f.get(i))+f.get(i).getFileName()+".html\">"+f.get(i).getTitle()+"</a></li>";
        } 
        if (file.getFileName().equals(f.get(i).getParent())) {
          sm[f.get(i).getNumber()+1] = "<li class=\"unforcused child\"><a href=\"http://ryosukecla.github.io./r-2.net.jp/"+familyTree(f.get(i))+f.get(i).getFileName()+".html\">"+f.get(i).getTitle()+"</a></li>";
        }
      }
      return sm;
    }
  }

  String[] backNext(File file) {
    String sm[] = new String[2];
    sm[0] = "";
    sm[1] = "";

    for (int i = 0; i < f.size(); i++) {
      if (file.getParent().equals(f.get(i).getParent())) {
        if (file.getNumber() - 1 == f.get(i).getNumber()) {
          sm[0] = "<li><a href=\"http://ryosukecla.github.io./r-2.net.jp/"+familyTree(f.get(i))+f.get(i).getFileName()+".html\">"+"back:"+f.get(i).getTitle()+"</a></li>";
        }
        if (file.getNumber() + 1 == f.get(i).getNumber()) {
          sm[1] = "<li><a href=\"http://ryosukecla.github.io./r-2.net.jp/"+familyTree(f.get(i))+f.get(i).getFileName()+".html\">"+"next"+f.get(i).getTitle()+"</a></li>";
        }
      }
    }
    return sm;
  }

  File getFile(String parent, int num) {
    for (int i = 0; i < f.size (); i++) {
      if (f.get(i).parent.equals(parent) == true) {
        if (f.get(i).number == num) return f.get(i);
      }
    }
    return null;
  }
}