// firebase emulators:start --only firestore

const firebase = require("@firebase/testing");

const MY_PROJECT_ID = "koikoi-b728a";
const myId = "user_abc";
const theirId = "user_xyz";
const myAuth = { uid: myId, email: "abc@gmail.com" };
const theirAuth = { uid: theirId, email: "xyz@gmail.com" };

function getFirestore(auth) {
  return firebase
    .initializeTestApp({ projectId: MY_PROJECT_ID, auth: auth })
    .firestore();
}

// ユーザー初期値
const userDocumentData = {
  name: "name",
  photoURL: "noImage",
  gender: "未設定",
  age: "未設定",
  job: "未設定",
  bloodType: "未設定",
  sign: "未設定",
  message: "",
  numberOfBestAnswer: 0,
  numberOfLikes: 0,
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
};

// 恋愛相談初期値
const consulDocumentData = (userRef) => {
  return {
    user: {
      ref: userRef,
    },
    category: "cate",
    title: "title",
    content: "content",
    supplement: "",
    solution: false,
    numberOfLikes: 0,
    numberOfAnswer: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    supplementCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
};

// 回答初期値
const answerDocumentData = (userRef) => {
  return {
    user: {
      ref: userRef,
    },
    content: "content",
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    numberOfLikes: 0,
    bestAnswer: false,
    comment: "",
    commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
};

// つぶやき初期値
const tweetDocumentData = (userRef) => {
  return {
    user: {
      ref: userRef,
    },
    category: "cate",
    content: "content",
    numberOfLikes: 0,
    numberOfComments: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
};

// つぶやきコメント初期値
const tweetCommentDocumentData = (userRef) => {
  return {
    user: {
      ref: userRef,
    },
    content: "content",
    numberOfLikes: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
};

const firestoreTest = describe("app", () => {
  // テスト毎にデータをリセットする
  // afterEach(async () => {
  //   await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  // });

  // ******************************************usersコレクション*********************************************

  // get、list
  it("userドキュメント1件の読み取りが可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertSucceeds(testDoc.get());
  });

  it("usersリスト(5件)の読み取りが可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("users").limit(5);
    await firebase.assertSucceeds(testDoc.get());
  });

  it("usersリスト(6件)の読み取りが不可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("users").limit(6);
    await firebase.assertFails(testDoc.get());
  });

  // create
  // schema
  it("構造が違うデータの書き込みが不可能であること", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertFails(
      testDoc.set({ ...userDocumentData, createdAt: "" })
    );
  });

  // validate
  it("userドキュメントのnameフィールドが21文字以上の書き込みが不可能であること", async () => {
    let word = "";
    for (let i = 0; i < 21; i++) {
      word += "a";
    }
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertFails(
      testDoc.set({ ...userDocumentData, name: word })
    );
  });

  // auth
  it("認証なしでusersコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertFails(testDoc.set(userDocumentData));
  });

  it("認証idとドキュメントidが異なる場合書き込み不可能であること", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(theirId);
    await firebase.assertFails(testDoc.set(userDocumentData));
  });

  it("認証ありでuserコレクションの書き込みが可能であること", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertSucceeds(testDoc.set(userDocumentData));
  });

  it("認証ありでuserコレクションの書き込みが可能であること(もう一人のuser)", async () => {
    const db = getFirestore(theirAuth);
    const testDoc = db.collection("users").doc(theirId);
    await firebase.assertSucceeds(testDoc.set(userDocumentData));
  });

  // update
  // auth
  it("認証なしでuserドキュメントの更新が不可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        message: "message",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("認証、email有効性確認有りでusersコレクションの更新が可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertSucceeds(
      testDoc.update({
        photoURL: "url",
        message: "message",
        gender: "gender",
        age: "age",
        job: "job",
        bloodType: "bloodType",
        sign: "sign",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("email有効性確認無しでuserドキュメントの更新が不可能であること", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        photoURL: "url",
        message: "message",
        gender: "gender",
        age: "age",
        job: "job",
        bloodType: "bloodType",
        sign: "sign",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("認証、email有効性確認有りで他のユーザーがuserドキュメントの更新が不可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("users").doc(theirId);
    await firebase.assertFails(
      testDoc.update({
        photoURL: "url",
        message: "message",
        gender: "gender",
        age: "age",
        job: "job",
        bloodType: "bloodType",
        sign: "sign",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("ユーザーが自身のいいね数更新が不可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        numberOfLikes: firebase.firestore.FieldValue.increment(1),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("ユーザーが自身のベストアンサー数更新が不可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        numberOfBestAnswer: firebase.firestore.FieldValue.increment(1),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  // schema
  it("構造が違うデータでのuserドキュメントの更新が不可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        photoURL: true,
        message: "message",
        gender: "gender",
        age: "age",
        job: "job",
        bloodType: "bloodType",
        sign: "sign",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  // validate
  it("photoURLが3001文字以上のデータでの更新が不可能であること", async () => {
    let word = "";
    for (let i = 0; i < 3001; i++) {
      word += "a";
    }
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        photoURL: word,
        message: "message",
        gender: "gender",
        age: "age",
        job: "job",
        bloodType: "bloodType",
        sign: "sign",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  // ******************************************consultationsコレクション*********************************************

  // get、list
  it("consultationドキュメント1件の読み取りが可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertSucceeds(testDoc.get());
  });

  it("consultationsリスト(10件)の読み取りが可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("consultations").limit(10);
    await firebase.assertSucceeds(testDoc.get());
  });

  it("consultationsリスト(11件)の読み取りが不可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("consultations").limit(11);
    await firebase.assertFails(testDoc.get());
  });

  // create
  // schema
  it("構造が違うデータでconsultationsコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const userDoc = db.collection("users").doc(myId);
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertFails(
      testDoc.set({ ...consulDocumentData(userDoc), category: 0 })
    );
  });

  // validate
  it("titleフィールドが101文字以上のデータでconsultationsコレクションの書き込みが不可能であること", async () => {
    let word = "";
    for (let i = 0; i < 101; i++) {
      word += "a";
    }
    const db = getFirestore({ ...myAuth, email_verified: true });
    const userDoc = db.collection("users").doc(myId);
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertFails(
      testDoc.set({ ...consulDocumentData(userDoc), title: word })
    );
  });

  // auth
  it("認証なしでconsultationsコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore(null);
    const userDoc = db.collection("users").doc(myId);
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertFails(testDoc.set(consulDocumentData(userDoc)));
  });

  it("認証有り、email有効性確認無しでconsultationsコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore(myAuth);
    const userDoc = db.collection("users").doc(myId);
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertFails(testDoc.set(consulDocumentData(userDoc)));
  });

  it("認証、email有効性確認有りでconsultationsコレクションの書き込みが可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const userDoc = db.collection("users").doc(myId);
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertSucceeds(testDoc.set(consulDocumentData(userDoc)));
  });

  // update(補足)
  // auth
  it("認証なしでconsultationドキュメントの更新が不可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        supplement: "s",
        supplementCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("認証有り、email有効性確認無しでconsultationドキュメントの更新が不可能であること", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        supplement: "s",
        supplementCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("認証、email有効性確認有りでconsultationドキュメントの更新が可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertSucceeds(
      testDoc.update({
        supplement: "s",
        supplementCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("作成者以外のユーザーのconsultationドキュメントの更新が不可能であること", async () => {
    const db = getFirestore({ ...theirAuth, email_verified: true });
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        supplement: "s",
        supplementCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  // schema
  it("構造が違うデータでconsultationドキュメントの補足更新が不可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        supplement: 0,
        supplementCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  // validate
  it("補足フィールドが501文字以上のデータでconsultationドキュメントの補足更新が不可能であること", async () => {
    let word = "";
    for (let i = 0; i < 501; i++) {
      word += "a";
    }
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertFails(
      testDoc.update({
        supplement: word,
        supplementCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  // ******************************************answersコレクション*********************************************

  // get、list
  it("answerドキュメント1件の読み取りが可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertSucceeds(testDoc.get());
  });

  it("answersリスト(10件)の読み取りが可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .limit(10);
    await firebase.assertSucceeds(testDoc.get());
  });

  it("answersリスト(11件)の読み取りが不可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .limit(11);
    await firebase.assertFails(testDoc.get());
  });

  // create
  // schema
  it("構造が違うデータでanswersコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore({ ...theirAuth, email_verified: true });
    const userDoc = db.collection("users").doc(theirId);
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertFails(
      testDoc.set({ ...answerDocumentData(userDoc), content: 0 })
    );
  });

  // validate
  it("contentフィールドが1001文字以上のデータでanswersコレクションの書き込みが不可能であること", async () => {
    let word = "";
    for (let i = 0; i < 1001; i++) {
      word += "a";
    }
    const db = getFirestore({ ...theirAuth, email_verified: true });
    const userDoc = db.collection("users").doc(theirId);
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertFails(
      testDoc.set({ ...answerDocumentData(userDoc), title: word })
    );
  });

  // auth
  it("認証なしでanswersコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore(null);
    const userDoc = db.collection("users").doc(theirId);
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertFails(testDoc.set(answerDocumentData(userDoc)));
  });

  it("認証有り、email有効性確認無しでanswersコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore(theirAuth);
    const userDoc = db.collection("users").doc(theirId);
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertFails(testDoc.set(answerDocumentData(userDoc)));
  });

  it("認証、email有効性確認有りでanswersコレクションの書き込みが可能であること", async () => {
    const db = getFirestore({ ...theirAuth, email_verified: true });
    const batch = db.batch();
    const userDoc = db.collection("users").doc(theirId);
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    const consulDoc = db.collection("consultations").doc(myId);
    batch.set(testDoc, answerDocumentData(userDoc));
    batch.update(consulDoc, {
      numberOfAnswer: firebase.firestore.FieldValue.increment(1),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    await firebase.assertSucceeds(batch.commit());
  });

  // update(相談者がコメント追加)
  // auth
  it("認証なしでanswerドキュメントの更新が不可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertFails(
      testDoc.update({
        comment: "s",
        commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("認証有り、email有効性確認無しでanswerドキュメントの更新が不可能であること", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertFails(
      testDoc.update({
        comment: "s",
        commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("認証、email有効性確認有りでanswerドキュメントの更新が可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertSucceeds(
      testDoc.update({
        comment: "s",
        commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  it("相談者以外のユーザーのanswerドキュメントの更新が不可能であること", async () => {
    const db = getFirestore({ ...theirAuth, email_verified: true });
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertFails(
      testDoc.update({
        comment: "s",
        commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  // schema
  it("構造が違うデータでanswerドキュメントの補足更新が不可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertFails(
      testDoc.update({
        comment: 0,
        commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  // validate
  it("コメントフィールドが501文字以上のデータでanswersドキュメントのコメント更新が不可能であること", async () => {
    let word = "";
    for (let i = 0; i < 501; i++) {
      word += "a";
    }
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db
      .collection("consultations")
      .doc(myId)
      .collection("answers")
      .doc(theirId);
    await firebase.assertFails(
      testDoc.update({
        comment: word,
        commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    );
  });

  // ******************************************tweetsコレクション*********************************************

  // get、list
  it("tweetドキュメント1件の読み取りが可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("tweets").doc(myId);
    await firebase.assertSucceeds(testDoc.get());
  });

  it("tweetsリスト(10件)の読み取りが可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("tweets").limit(10);
    await firebase.assertSucceeds(testDoc.get());
  });

  it("tweetsリスト(11件)の読み取りが不可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("tweets").limit(11);
    await firebase.assertFails(testDoc.get());
  });

  // create
  // schema
  it("構造が違うデータでtweetsコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const userDoc = db.collection("users").doc(myId);
    const testDoc = db.collection("tweets").doc(myId);
    await firebase.assertFails(
      testDoc.set({ ...tweetDocumentData(userDoc), category: 0 })
    );
  });

  // validate
  it("contentフィールドが301文字以上のデータでtweetsコレクションの書き込みが不可能であること", async () => {
    let word = "";
    for (let i = 0; i < 301; i++) {
      word += "a";
    }
    const db = getFirestore({ ...myAuth, email_verified: true });
    const userDoc = db.collection("users").doc(myId);
    const testDoc = db.collection("tweets").doc(myId);
    await firebase.assertFails(
      testDoc.set({ ...tweetDocumentData(userDoc), content: word })
    );
  });

  // auth
  it("認証なしでtweetsコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore(null);
    const userDoc = db.collection("users").doc(myId);
    const testDoc = db.collection("tweets").doc(myId);
    await firebase.assertFails(testDoc.set(tweetDocumentData(userDoc)));
  });

  it("認証有り、email有効性確認無しでtweetsコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore(myAuth);
    const userDoc = db.collection("users").doc(myId);
    const testDoc = db.collection("tweets").doc(myId);
    await firebase.assertFails(testDoc.set(tweetDocumentData(userDoc)));
  });

  it("認証、email有効性確認有りでtweetsコレクションの書き込みが可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const userDoc = db.collection("users").doc(myId);
    const testDoc = db.collection("tweets").doc(myId);
    await firebase.assertSucceeds(testDoc.set(tweetDocumentData(userDoc)));
  });

  // ******************************************commentsコレクション*********************************************

  // get、list
  it("commentドキュメント1件の読み取りが可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db
      .collection("tweets")
      .doc(myId)
      .collection("comments")
      .doc(theirId);
    await firebase.assertSucceeds(testDoc.get());
  });

  it("commentリスト(10件)の読み取りが可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db
      .collection("tweets")
      .doc(myId)
      .collection("comments")
      .limit(10);
    await firebase.assertSucceeds(testDoc.get());
  });

  it("commentリスト(11件)の読み取りが不可能であること", async () => {
    const db = getFirestore(null);
    const testDoc = db
      .collection("tweets")
      .doc(myId)
      .collection("comments")
      .limit(11);
    await firebase.assertFails(testDoc.get());
  });

  // create
  // schema
  it("構造が違うデータでcommentsコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore({ ...theirAuth, email_verified: true });
    const userDoc = db.collection("users").doc(theirId);
    const testDoc = db
      .collection("tweets")
      .doc(myId)
      .collection("comments")
      .doc(theirId);
    await firebase.assertFails(
      testDoc.set({ ...tweetCommentDocumentData(userDoc), content: 0 })
    );
  });

  // validate
  it("contentフィールドが151文字以上のデータでcommentsコレクションの書き込みが不可能であること", async () => {
    let word = "";
    for (let i = 0; i < 151; i++) {
      word += "a";
    }
    const db = getFirestore({ ...theirAuth, email_verified: true });
    const userDoc = db.collection("users").doc(theirId);
    const testDoc = db
      .collection("tweets")
      .doc(myId)
      .collection("comments")
      .doc(theirId);
    await firebase.assertFails(
      testDoc.set({ ...tweetCommentDocumentData(userDoc), content: word })
    );
  });

  // auth
  it("認証なしでcommentsコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore(null);
    const userDoc = db.collection("users").doc(theirId);
    const testDoc = db
      .collection("tweets")
      .doc(myId)
      .collection("comments")
      .doc(theirId);
    await firebase.assertFails(testDoc.set(tweetCommentDocumentData(userDoc)));
  });

  it("認証有り、email有効性確認無しでcommentsコレクションの書き込みが不可能であること", async () => {
    const db = getFirestore(theirAuth);
    const userDoc = db.collection("users").doc(theirId);
    const testDoc = db
      .collection("tweets")
      .doc(myId)
      .collection("comments")
      .doc(theirId);
    await firebase.assertFails(testDoc.set(tweetCommentDocumentData(userDoc)));
  });

  it("認証、email有効性確認有りでcommentsコレクションの書き込みが可能であること", async () => {
    const db = getFirestore({ ...theirAuth, email_verified: true });
    const userDoc = db.collection("users").doc(theirId);
    const testDoc = db
      .collection("tweets")
      .doc(myId)
      .collection("comments")
      .doc(theirId);
    await firebase.assertSucceeds(
      testDoc.set(tweetCommentDocumentData(userDoc))
    );
  });

  // consultationドキュメント、tweetドキュメントの削除

  // consultation
  it("作成者以外のユーザーのconsultationドキュメントの削除が不可能であること", async () => {
    const db = getFirestore({ ...theirAuth, email_verified: true });
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertFails(testDoc.delete());
  });

  // answerドキュメントの更新をコメントアウトしてからテストする
  it("認証、email有効性確認有りでconsultationドキュメントの削除が可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("consultations").doc(myId);
    await firebase.assertSucceeds(testDoc.delete());
  });

  // tweet
  it("作成者以外のユーザーのtweetドキュメントの削除が不可能であること", async () => {
    const db = getFirestore({ ...theirAuth, email_verified: true });
    const testDoc = db.collection("tweets").doc(myId);
    await firebase.assertFails(testDoc.delete());
  });

  it("認証、email有効性確認有りでtweetドキュメントの削除が可能であること", async () => {
    const db = getFirestore({ ...myAuth, email_verified: true });
    const testDoc = db.collection("tweets").doc(myId);
    await firebase.assertSucceeds(testDoc.delete());
  });

  // 最後に全てのデータを消す
  after(async () => {
    await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
  });
});
