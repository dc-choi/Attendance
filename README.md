# Attendance

## 개발기간
22.02.19 ~ 현재 (첫 배포는 기획한지 2주만에 진행)

___

## 만들게 된 계기
<details>
<!-- <summary>접기/펼치기 버튼</summary> -->

중고등부 주일학교는 시무식을 앞두고 각자 생각하는 개인, 그리고 공동체의 목표와 비전에 대해서 생각을 해보게 되었습니다. 솔직히 말씀드리자면 사실 처음에는 잘 와닿지 않고 무엇을 생각해야 하나 많은 고민이 있었는데요...

제 나름의 생각을 해본 결과, 우선 난 어떤 사람인지에 대해서 생각하고, 현재 중고등부의 문제점, 그리고 내가 중고등부에 기여를 할 수 있는 점이 무엇인지 생각을 해보았습니다.

그 결과 내가 가지고 있는 기초적인 웹 프로그래밍에 대한 지식이라면 중고등부의 시스템을 어느 정도 전산화할 수 있지 않을까? 생각을 하게 되었습니다. 현 중고등부의 시스템 중 어떤 부분을 전산화 할 수 있을까? 를 생각하다가 출석부 프로그램을 만들게 되면 편리할 거 같아서 제작하였습니다.

기존의 중고등부의 문제점은 다음과 같습니다.

1. 코로나로 인해 아이들이 나오지 않게 되면서 20년도부터 출석 체크를 하지 않아, 기존 출석부의 데이터와 현 상황이 맞지 않게 되었습니다.
2. 매년 엑셀로 된 출석부를 다시 만들어야 해서, 아이들의 정보를 다시 입력하고, 새로운 아이들의 정보를 입력하는 데 많은 어려움이 있었습니다.
3. 매년 출석 상을 보상해야 하는데, 기존의 출석부로는 아이들의 출석 통계를 내는 게 어려웠습니다.
4. 엑셀로 된 출석부를 가지고 있지않으면, 출석체크가 불가능합니다.

출석부 프로그램을 제작함으로써, 개선되는 점은 다음과 같습니다.

1. 매년 출석부를 다시 만들지 않아도, 한번만 아이들의 정보를 등록하면 졸업하기 전까지 정보를 계속 유지할 수 있습니다.
2. 출석부 프로그램을 누구나 언제든 출석사항을 기록하고 확인 할 수 있습니다.
3. 회의록을 통해 확인해야하는 출석현황과 다르게 직관적으로 확인이 가능합니다.
4. 출석 상에 대한 통계를 낼때, 간편하게 산출할 수 있습니다.

저의 작은 노력으로 중고등부 공동체가 좋은 방향으로 변화했으면 좋겠습니다. 감사합니다.

</details>

___

## 사용 기술
<details>
<!-- <summary>접기/펼치기 버튼</summary> -->

FrontEnd
- HTML5
- CSS3
- JavaScript
- jQuery 3.6.0

BackEnd
- Node.js 17.6.0
- Express 4.16.1
- Sequelize 6.16.2
- MYSQL 8.0.28

DevOps
- Ubuntu 20.04.4 LTS
- AWS EC2
- GitHub

</details>

___

## 주요 기능
<details>
<!-- <summary>접기/펼치기 버튼</summary> -->

- 그룹 리스트: 주일학교 학생들이 속한 그룹을 보고, 추가하고, 수정하고, 삭제할 수 있습니다.
- 학생 명단: 주일학교 학생들의 명단을 보고, 추가하고, 수정하고, 삭제할 수 있습니다.
- 출석부: 주일학교 학생들의 출석을 보고, 추가하고, 수정하고, 삭제할 수 있습니다.
- 통계(추후 패치를 통해 추가 예정): 학생들의 출석 현황을 간단하게 확인 할 수 있습니다.

</details>

___

## 출석부 프로그램 초기 화면 구성
[오븐을 이용한 프로토타입](https://ovenapp.io/view/uUt1nneSOrTuih71pV814CGUcr6lRVKP/I6IRP)

___

## 패치내역
<details>
<!-- <summary>접기/펼치기 버튼</summary> -->

- v1.1.0 (22.03.03)
	- 기능 및 버그를 추가, 수정하였습니다.<br/><br/>
	1. 학생 조회에서 검색시 페이징이 정상적으로 적용되지않던 버그 수정
	2. 그룹 CRUD 기능 추가
	3. DB 설계 변경으로 인한 사이드 이펙트 수정

</details>

___

## 개선점 및 향후 패치방향
<details>
<!-- <summary>접기/펼치기 버튼</summary> -->

1. 아직 통계 페이지가 완성되지않았습니다. 다음 패치에 완성시킬 예정입니다.
2. ~~현재는 그룹을 추가, 수정, 삭제하려면 개발자가 직접 수정해야합니다. 그룹을 추가, 수정, 삭제하는 기능을 추가 할 예정입니다.~~ (개발완료)
3. 아이들에 대한 상세정보를 적을 수 없습니다. 이에 따른 상세 정보 추가, 수정, 삭제하는 기능을 추가 할 예정입니다.
4. 초등부와 데이터 연계를 생각하고 있습니다. 초등부와 데이터를 연계하게 된다면, 아이들의 정보를 직접 인수인계 받지않아도 자동으로 중고등부로 인계되도록 설계 할 것입니다. 초등부와 연계에 필요한 기능은 로그인, 로그아웃을 추가할 예정입니다.
5. 아이들이 한살 먹으면 자동으로 아이들의 나이를 한살 증가시켜주는 기능을 추가 할 예정입니다. 초등부의 경우, 자동으로 학년도 올라가도록 설정 할 것이고, 중고등부로 올라올때 초등부의 그룹에서 자동으로 해제되도록 할 것입니다.
6. UI를 수정할 예정입니다. 현재 UI는 가독성이 좋지않아 사용에 불편이 있을것으로 예상합니다. 그에 따른 대대적인 UI 수정을 진행할 예정입니다.
7. UI 수정을 진행하면서, 코드 리펙토링도 진행할 예정입니다. (eslint 적용 및 Clean Code 지향)
[https://sunmon.github.io/vscode-eslint-prettier-setting/](https://sunmon.github.io/vscode-eslint-prettier-setting/) 참고

</details>

___

## 느낀점
<details>
<!-- <summary>접기/펼치기 버튼</summary> -->

22.03.02: AWS를 이용해서 처음 배포를 진행했었는데 22년 3월 1일 22시부터 배포를 시작해서 다음날 02시까지 총 4시간의 배포를 진행했었습니다. 1.0.0 버전은 정말 간단하게 시작을 했었지만, 그래도 배포라는것이 정말 쉽지않고 내가 생각한만큼 잘 되지않는다는것을 배웠습니다. 다음에 배포를 진행할 경우 좀 더 테스트를 하고 계획을 세우고 배포를 진행하고 싶습니다. [참고링크: [Node.js] EC2에 Express APP 배포하기](https://dc-choi.tistory.com/50)

22.03.03: 페이징 버그 및 그룹 추가, 삭제, 수정 기능을 추가했습니다. DB 스키마를 변경함으로써, PM2로 매니징 하던 웹 서버를 종료 후 EC2에 설치된 Mysql Server에 새 DB 스키마를 적용하고 웹 서버에는 바뀐 소스코드를 적용한 다음 다시 시작을 하였습니다. 수동으로 서비스를 중지하고 배포를 진행했던 점이 좀 아쉬웠습니다. 이 프로젝트에 CI/CD를 적용시키고 싶습니다.

</details>