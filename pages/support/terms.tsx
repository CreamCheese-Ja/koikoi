import Head from "next/head";
import styles from "styles/terms.module.css";
import Divider from "@material-ui/core/Divider";
import { useSetRecoilState } from "recoil";
import { pageNumberState } from "src/atoms/atom";
import { useEffect } from "react";

const Terms = () => {
  const setPageNumber = useSetRecoilState(pageNumberState);

  useEffect(() => {
    setPageNumber(5);
  }, []);

  return (
    <div>
      <Head>
        <title>利用規約 | 恋々</title>
        <meta
          name="description"
          content="気軽に使える恋愛相談SNS【恋々】の利用規約ページ"
        />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>利用規約</h1>
        <Divider />
        <div className={styles.main}>
          <p className={styles.topDescription}>
            この利用規約（以下「本規約」といいます）は、恋々運営管理者(以下「当サイト管理者」といいます)が、恋々（以下「本サイト」といいます）の利用条件を定めるものです。
            登録ユーザーの皆さま（以下「ユーザー」といいます）には、本規約に従って、本サイトをご利用いただきます。
          </p>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第１条 適用</h2>
            <ol className={styles.oneItemOl}>
              <li>
                本規約は、ユーザーと本サイトの利用に関わる一切の関係に適用されるものとします。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第２条 利用登録</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                本サイトにおいては、登録希望者が本規約に同意の上、本サイトの定める方法によって利用登録が完了するものとします。
              </li>
              <li className={styles.listItem}>
                当サイト管理者は、利用登録ユーザーに以下の事由があると判断した場合、事前に通知することなく本サイトの全部または一部の提供を停止または中断することができるものとします。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>
              第３条 メールアドレスおよびパスワードの管理
            </h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                ユーザーは、自己の責任において、本サイトに登録したメールアドレスおよびパスワードを適切に管理するものとします。
              </li>
              <li className={styles.listItem}>
                ユーザーは、いかなる場合にも、本サイトに登録したメールアドレスおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。当サイト管理者は、メールアドレスとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのメールアドレスを登録しているユーザー自身による利用とみなします。
              </li>
              <li className={styles.listItem}>
                メールアドレス及びパスワードが第三者によって使用されたことによって生じた損害は、当サイト管理者に故意又は重大な過失がある場合を除き、当サイト管理者は一切の責任を負わないものとします。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第４条 投稿内容の利用</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                ユーザーは、当サイト管理者に対し、投稿内容を利用（複製、複写、改変、第三者への再許諾その他のあらゆる利用を含む。）する権利を無償で許諾するものとします。
              </li>
              <li className={styles.listItem}>
                ユーザーは、本サイトに投稿した投稿内容を他のユーザーが商用私用問わず無償で使用することを許諾し、他のユーザーはこれを使用できるものとします。
              </li>
              <li className={styles.listItem}>
                当サイト管理者、ユーザー、その他の第三者が投稿内容を利用したことにより、当該投稿内容を投稿したユーザーに生じた損害について、当サイト管理者は一切の責任を負いません。
              </li>
              <li className={styles.listItem}>
                当サイト管理者は投稿内容を当サイト管理者の裁量で自由に保存することができるものとし、当サイト管理者が必要と認めた場合には、投稿者の承諾を得ることなく、保存されている投稿内容の削除又は修正を行う場合があります。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第５条 禁止事項</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                ユーザーは、本サイトの利用にあたり、以下の行為をしてはなりません。
              </li>
              <ol className={styles.innerList}>
                <li className={styles.innerListItem}>
                  法令に違反する行為 犯罪行為に関連する行為
                </li>
                <li className={styles.innerListItem}>
                  当サイト管理者、他のユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                </li>
                <li className={styles.innerListItem}>
                  本サイトの運営を妨害するおそれのある行為法令に違反する行為
                  犯罪行為に関連する行為
                </li>
                <li className={styles.innerListItem}>
                  不正アクセスや不正アクセスを試みる行為
                </li>
                <li className={styles.innerListItem}>
                  他のユーザーに関する個人情報等を収集または蓄積する行為
                </li>
                <li className={styles.innerListItem}>
                  不正な目的を持って本サイトを利用する行為
                </li>
                <li className={styles.innerListItem}>
                  本サイトの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為
                </li>
                <li className={styles.innerListItem}>
                  他のユーザーに成りすます行為
                </li>
                <li className={styles.innerListItem}>
                  当サイト管理者が許諾しない本サイト上での宣伝、広告、勧誘、または営業行為
                </li>
                <li className={styles.innerListItem}>
                  本サイトに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
                </li>
                <li className={styles.innerListItem}>
                  当サイト管理者または本サービスの名誉または信用を毀損する行為
                </li>
                <li className={styles.innerListItem}>
                  その他、当サイト管理者が不適切と判断する行為
                </li>
              </ol>
              <li className={styles.listItem}>
                ユーザーが前項各号または本規約のその他の条項に違反し、これにより当サイト管理者に損害が生じた場合、ユーザーは、当サイト管理者に対し、当該損害を賠償するものとします。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第６条 本サイトの提供の停止等</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                当サイト管理者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サイトの全部または一部の提供を停止または中断することができるものとします。
                <ol className={styles.innerList}>
                  <li className={styles.innerListItem}>
                    本サイトにかかるコンピュータシステムの保守点検または更新を行う場合
                  </li>
                  <li className={styles.innerListItem}>
                    地震、落雷、火災、停電または天災などの不可抗力により、本サイトの提供が困難となった場合
                  </li>
                  <li className={styles.innerListItem}>
                    コンピュータまたは通信回線等が事故により停止した場合
                  </li>
                  <li className={styles.innerListItem}>
                    その他、当サイト管理者が本サイトの提供が困難と判断した場合
                  </li>
                </ol>
              </li>
              <li className={styles.listItem}>
                当サイト管理者は、本サイトの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第７条 利用制限および登録抹消</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                当サイト管理者は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サイトの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
                <ol className={styles.innerList}>
                  <li className={styles.innerListItem}>
                    本規約のいずれかの条項に違反した場合
                  </li>
                  <li className={styles.innerListItem}>
                    登録事項に虚偽の事実があることが判明した場合
                  </li>
                  <li className={styles.innerListItem}>
                    当サイト管理者からの連絡に対し、一定期間返答がない場合
                  </li>
                  <li className={styles.innerListItem}>
                    その他、当サイト管理者が本サイトの利用を適当でないと判断した場合
                  </li>
                </ol>
              </li>
              <li className={styles.listItem}>
                当サイト管理者は、本条に基づき当サイト管理者が行った行為によりユーザーに生じた損害について、一切の責任を負いません。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第８条 退会</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                ユーザーが、本サイトお問い合わせフォームより退会の旨を示すことで、当サイト管理者が退会処理を行います。
              </li>
              <li className={styles.listItem}>
                1度退会処理を行うと、２度と前回のアカウントを使用することはできません。
              </li>
              <li className={styles.listItem}>
                ユーザーが退会した場合であっても、退会前のプロフィール情報、投稿データなどは保持、公開されたままとなりますので、ご注意ください。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第９条 保証の否認および免責事項</h2>
            <ol className={styles.ol}>
              <li className={styles.listItem}>
                当サイト管理者は、以下に掲げる事項について一切保証しないものとします。ユーザーは、本サイトの利用及び本サイトにより提供される情報の有用性等を自己の判断、かつ責任で利用するものとします。
                <ol className={styles.innerList}>
                  <li className={styles.innerListItem}>
                    本サイトで提供される全ての情報（本サイトから提供される情報及び本サイト上に表示される第三者が管理又は運営するリンク先に含まれる一切の情報等を含みます。以下、本項において同様とします。）に関する、有用性、適合性、完全性、正確性、信頼性、安全性、合法性、道徳性、最新性
                  </li>
                  <li className={styles.innerListItem}>
                    会員間のやりとりに関する一切の事項
                  </li>
                  <li className={styles.innerListItem}>
                    本サイトの提供に不具合、エラーや障害が生じないこと
                  </li>
                  <li className={styles.innerListItem}>
                    本サイトの存続又は同一性が維持されること
                  </li>
                  <li className={styles.innerListItem}>
                    本サイトがユーザーに対し特定の効能、結果等をもたらすこと
                  </li>
                </ol>
              </li>
              <li className={styles.listItem}>
                当サイト管理者は、本サイトに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。
              </li>
              <li className={styles.listItem}>
                前項ただし書に定める場合であっても、当サイト管理者は、当サイト管理者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当サイト管理者またはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。
              </li>
              <li className={styles.listItem}>
                当サイト管理者は、本サイトに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第１０条 サイト内容の変更等</h2>
            <ol className={styles.oneItemOl}>
              <li>
                当サイト管理者は、ユーザーに通知することなく、本サイトの内容を変更し、または本サイトの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第１１条 利用規約の変更</h2>
            <ol className={styles.oneItemOl}>
              <li>
                当サイト管理者は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サイトの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなし、変更後の規約が、当サイト管理者と当該ユーザーとの法律関係にただちに適用されるものとします。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第１２条 個人情報の取扱い</h2>
            <ol className={styles.oneItemOl}>
              <li>
                当サイト管理者は、本サイトの利用によって取得する個人情報については、「プライバシーポリシー」に従い適切に取り扱うものとします。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第１３条 通知または連絡</h2>
            <ol className={styles.oneItemOl}>
              <li>
                ユーザーと当サイト管理者との間の通知または連絡は、当サイト管理者の定める方法によって行うものとします。当サイト管理者は、ユーザーから、当サイト管理者が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第１４条 権利義務の譲渡の禁止</h2>
            <ol className={styles.oneItemOl}>
              <li>
                ユーザーは、当サイト管理者の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
              </li>
            </ol>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subTitle}>第１５条 準拠法</h2>
            <ol className={styles.oneItemOl}>
              <li>本規約は、日本法に従って解釈されます。</li>
            </ol>
          </div>
          <p>2021年11月3日 制定</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
