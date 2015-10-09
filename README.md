# r-2.net.jp
this is new home page, r-2.net.jp

HPManager_sqrt_Rの使い方

/hpdataにはindex.txtがあります。
この中に/hpdataにあるファイルを読み込むための設定を行います。
index.txtの中には読み込みたいファイル名を書き込みます。

また読み込むファイルには型があります。
中身：
nature:parent or child
parent:fileName or none
fileName:any
title:any
body:
//here

という型となっています。
fileNameはhtml形式のファイルが作られた場合、その作られたファイルの名前がこれにあたります。
またfileNameの部分には.htmlと書く必要はありません。

こうして、HpManagerをRunしますと/hpにファイルが作られます。
あとは、中身をコピペし、commit、次にsyncすれば完了です。