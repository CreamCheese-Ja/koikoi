import Head from "next/head";
import styles from "styles/privacy.module.css";
import Divider from "@material-ui/core/Divider";
import { useSetRecoilState } from "recoil";
import { pageNumberState } from "src/atoms/atom";
import { useEffect } from "react";

const Privacy = () => {
  const setPageNumber = useSetRecoilState(pageNumberState);

  useEffect(() => {
    setPageNumber(5);
  }, []);

  return (
    <div>
      <Head>
        <title>プライバシーポリシー | 恋々</title>
        <meta
          name="description"
          content="気軽に使える恋愛相談SNS【恋々】のプライバシーポリシーページ"
        />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>プライバシーポリシー</h1>
        <Divider />
        <div className={styles.main}>
          <p className={styles.topDescription}>
            恋々運営管理者（以下「当サイト管理者」とします）は、恋々（以下「本サイト」といいます）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
          </p>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第１条 個人情報</h2>
            <ol className={styles.oneItemOl}>
              <li>
                「個人情報」とは、個人情報保護法第2条第1項により定義された個人情報、すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるものとします。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>
              第２条 個人情報を収集・利用する目的
            </h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                当サイト管理者が個人情報を収集・利用する目的は以下のとおりです。
                <ol className={styles.innerList}>
                  <li className={styles.innerListItem}>
                    本サイトの提供・運営のため
                  </li>
                  <li className={styles.innerListItem}>
                    ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
                  </li>
                  <li className={styles.innerListItem}>
                    ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当サイト管理者が提供する関連サービスの案内のメールを送付するため
                  </li>
                  <li className={styles.innerListItem}>
                    有料サービスにおいて、ユーザーに利用料金を請求するため
                  </li>
                  <li className={styles.innerListItem}>
                    上記の利用目的に付随する目的
                  </li>
                </ol>
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第３条 利用目的の変更</h2>
            <ol className={styles.oneItemOl}>
              <li>
                個人情報の利用目的を、関連性を有すると合理的に認められる範囲内において変更することがあり、変更した場合にはお客様に通知又は公表します。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第４条 個人情報の適正な取得</h2>
            <ol className={styles.oneItemOl}>
              <li>
                当サイト管理者は、適正に個人情報を取得し、偽りその他不正の手段により取得しません。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第５条 個人情報の安全管理</h2>
            <ol className={styles.oneItemOl}>
              <li>
                当サイト管理者は、個人情報の紛失、破壊、改ざん及び漏洩などのリスクに対して、個人情報の安全性が図られるよう、適切な管理を行います。また、当サイト管理者は、個人情報の取扱いの全部又は一部を委託する場合は、委託先において個人情報の安全性が図られるよう、必要かつ適切な監督を行います。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第６条 個人情報の第三者提供</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                当サイト管理者は、個人情報保護法その他の法令により許容される場合を除き、お客様の同意を得ず、利用目的の達成に必要な範囲を超えて個人情報を取り扱いません。但し、次の場合はこの限りではありません。
                <ol className={styles.innerList}>
                  <li className={styles.innerListItem}>法令に基づく場合</li>
                  <li className={styles.innerListItem}>
                    人の生命、身体又は財産の保護のために必要がある場合であって、お客様の同意を得ることが困難であるとき
                  </li>
                  <li className={styles.innerListItem}>
                    公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、お客様の同意を得ることが困難であるとき
                  </li>
                  <li className={styles.innerListItem}>
                    国の機関もしくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、お客様の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                  </li>
                </ol>
              </li>
              <li className={styles.listItem}>
                前項の定めにかかわらず、次に掲げる場合は当該情報の提供先は第三者に該当しないものとします。
                <ol className={styles.innerList}>
                  <li className={styles.innerListItem}>
                    当サイト管理者が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
                  </li>
                  <li className={styles.innerListItem}>
                    合併その他の事由による事業の承継に伴って個人情報が提供される場合
                  </li>
                  <li className={styles.innerListItem}>
                    個人情報保護法の定めに基づき共同利用する場合
                  </li>
                </ol>
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第７条 個人情報の開示</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                当サイト管理者は、本人から個人情報の開示を求められたときは、本人に対し遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合にはその旨を遅滞なく通知します。
                <ol className={styles.innerList}>
                  <li className={styles.innerListItem}>
                    本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合
                  </li>
                  <li className={styles.innerListItem}>
                    当サイト管理者の業務の適正な実施に著しい支障を及ぼすおそれがある場合
                  </li>
                  <li className={styles.innerListItem}>
                    その他法令に違反することとなる場合
                  </li>
                </ol>
              </li>
              <li className={styles.listItem}>
                前項の定めにかかわらず、履歴情報および特性情報など、個人情報以外の情報については原則として開示いたしません。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第８条 個人情報の訂正および削除</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                ユーザーは、当サイト管理者の保有する自己の個人情報が誤った情報である場合には、個人情報の訂正、追加または削除（以下「訂正等」といいます）を請求することができます。
              </li>
              <li className={styles.listItem}>
                当サイト管理者は、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正等を行うものとします。
              </li>
              <li className={styles.listItem}>
                当サイト管理者は、前項の規定に基づき訂正等を行った場合、または個人情報保護法その他の法令により訂正等を行わない旨の決定をしたときは遅滞なく、これをユーザーに通知します。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第９条 個人情報の利用停止等</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                ユーザーは、ユーザー本人の個人情報が「あらかじめ公表された利用目的の範囲を超えて取り扱われているという理由」又は「偽りその他不正の手段により取得されたものであるという理由」により、個人情報保護法の定めに基づきその利用の停止又は消去（以下「利用停止等」といいます）を求めることができます。
              </li>
              <li className={styles.listItem}>
                当サイト管理者は、ユーザーから前項の請求を受けて、その請求に理由があることが判明した場合には、本人からの請求であることを確認の上で、遅滞なく個人情報の利用停止等を行い、その旨をユーザーに通知します。但し、個人情報保護法その他の法令により、当サイト管理者が利用停止等の義務を負わない場合は、この限りではありません。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>
              第１０条 Cookie(クッキー)その他の技術の利用
            </h2>
            <ol className={styles.oneItemOl}>
              <li>
                本サイトは、利用者の皆様によりよいサービスを提供するため、Cookie及びこれに類する技術を利用することがあります。これは個人を特定できる情報の収集を行えるものではなく、お客様のプライバシーを侵害することがありません。
                <br />
                ※Cookie(クッキー)とは、サーバーコンピュータからのお客様のブラウザに送信され、お客様が使用しているコンピュータのハードディスクに蓄積される情報です。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第１１条 継続的改善</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                当サイト管理者は、個人情報の取り扱いに関する運用状況を適宜見直し、継続的な改善に努めるものとし、必要に応じて、プライバシーポリシーを変更することがあります。本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく変更することができるものとします。
              </li>
              <li className={styles.listItem}>
                変更後のプライバシーポリシーは、本サイトに掲載したときから効力を生じるものとします。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第１２条 お問い合わせ窓口</h2>
            <ol className={styles.oneItemOl}>
              <li>
                開示等のお申出、ご意見、ご質問、苦情、その他個人情報の取り扱いに関するお問い合わせは、本サイトお問い合わせフォームよりお願いいたします。
              </li>
            </ol>
          </div>
          <p>2021年11月3日 制定</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
