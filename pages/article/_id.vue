<template>
  <div>
    <div class="article-main">
      <a-skeleton :loading="loading" :title="{ width: '50%' }" :paragraph="false" active>
        <h1 class="article-main__title">别只用 Selenium，新神器 Pyppeteer 绕过淘宝更简单</h1>
      </a-skeleton>
      <a-skeleton class="article-cover" :loading="loading" :paragraph="{ rows: 0 }" active avatar>
        <div class="ui-flex ui-flex__center">
          <a-avatar size="large" icon="user" class="article-cover__img" />
          <div class="ui-flex__item article-cover__name">
            <p>我爱学</p>
            <div>
              <span>2019.05.13 16:26</span>
              <span>阅读 942</span>
              <span>评论 2</span>
              <span>喜欢 39</span>
            </div>
          </div>
        </div>
      </a-skeleton>
      <a-skeleton class="article-cnt" :loading="loading" :title="false" :paragraph="{ rows: 10 }" active>
        <div class="article-cnt-work">
          <p>
            今日凌晨四点，我突然被一阵暄闹声惊醒，急忙走到阳台上一看，对面三单元已围了不少人。议论声，叹息声，哭泣声在这黎明来临之前，格外清晰。我披衣跑到现场，见一少年仰躺在地上，一动不动，脸已变型。一位穿着短睡衣的中年妇女，紧紧抱着少年的身体，哭的几乎昏厥过去。120医生、护士正在抢救少年。我觉得这妇女背影很熟，走到近前一看
            : 原来是夏琳！我忙问身边的徐大爷，"她孩子怎么了？"徐大爷说 :
            "跳楼了。"我吓了一大跳，"是咋一回事？""我也不知道。"不少人也在议论纷纷，"这个娃娃还这么小哟，咋就想到跳楼了？"我也很纳闷，"夏琳的儿子怎么会跳楼呢？"这一突发情况，完全超过了我之前对她娘俩的认知。一会儿，抢救医生对警/官和夏琳说
            :
            "他已没有生命体症。""可惜了，可惜了。"现场顿时响起一片唏嘘声。夏琳抱着儿子的尸体，哭得昏天黑地，"儿子啊，你咋就那么傻呀！妈妈说过永远不离开你，你说这辈子陪着妈妈，你咋突然一声不响就走了，你丟下妈妈一人，妈妈怎么活呀！""别哭了大姐。"一位警/官劝道，"孩子叫什么名字？多大了？""郭浩。十五岁。""这两天他有没有异常行为。""没有。昨晚他还和我一起看电视。十点半我们就进各自房间睡了。没料到他会想不通。"夏琳哽咽着说。"想不通？为啥想不通？"警/官问。"他是盲人。他多次说不想拖累我。"说到此，夏琳放声大哭起来。"他父亲呢？""我们离婚了。"警/官"哦"了一声，"你先联系殡仪馆把尸体拉走，随即到派出所做个笔录。"我回到楼上，看着那具等着送往殡仪馆的尸体，看着那个弱小的、悲痛的女人，不禁哀从心来。"老天不公啊！"我心中为夏琳多舛的命运叫屈。丈夫抛妻弃子，子又跳楼身亡，家庭支离破碎，自己孑然一身。换成任何一个女人，都是无法承受之痛。我完全能够想像，她此刻有多么绝望！更令她心碎的是，儿子的死，是为了她的下半生活得幸福一些。我想，尽管她儿子的做法不可取。但这份孝心，却可感天动地。对夏琳和他的儿子，我还算了解一些。有一次，我在小区门外盲人按摩店做颈椎理疗。她也带着儿子到按摩店按摩。"浩浩，你要认真记住师傅的手法。"她对儿子说。声音很温婉。"好的。"我觉得好奇，便问道
            : "你这孩子这么帅，你咋叫他学盲人按摩？"她说 : "
            他是盲人，学会这个技术今后不会饿饭。""他是盲人？你怎么没送他到特殊学校学习？""他在学习。我现在有空就陪他到按摩店按摩，让他体会一下当患者的感受。""你这想法很不错。"我由衷地赞道。我俩东一句西一句，倒对她的家庭有了些了解。两年前，他丈夫出轨，二人离婚。房子归了她，残疾的儿子也归了他。丈夫现在和小情人悠哉游哉，她和儿子相依为命。浩浩见妈妈话题沉重，便安慰道
            :
            "妈妈别难过，那个人走了就走了，儿子还在你身边。我今后挣到钱，会好好孝顺您。""浩浩好样的，像个有担当的男子汉，叔叔挺你。"浩浩嘿嘿一笑，"叔叔，今后我开店，你来找我，我一定把你的颈椎病医治好。""哈哈哈，要的，要的。"我开怀大笑，她和按摩师也大笑起来。浩浩按摩时点到了，挽着妈妈胳膊走了。"她是儿子的拐杖与眼睛。"我突然这样想。我问老板，"她叫啥名字？""夏琳。"那天，夏琳和她的儿子，给我留下了深刻的印象。同住一大型小区的人，若无交集，几个月一年没见面属常事。没想到，再次与她母子相见，竟是在如此令人心碎的时刻。望着对面肝肠欲断的夏琳，容易伤春悲秋的我，生发出深深地感叹
            : 世事啊，真是难料！悲剧啊悲剧，惨痛的悲剧！造成悲剧根源的那个男人，你，现在又在哪里？！
          </p>
        </div>
      </a-skeleton>
      <div class="article-action">
        <div class="article-action-tag">
          <ul class="article-action-item">
            <li><a-icon type="tag" theme="filled" /> 博客</li>
            <li><a-icon type="tag" theme="filled" /> PassWord</li>
          </ul>
          <p class="article-action-date">创建于: 2019-02-19</p>
        </div>
        <div class="ui-flex ui-flex__center">
          <div class="ui-flex__item article-action-keep">分享</div>
          <a-button class="article-action-btn" size="large" type="default">
            <a-icon type="heart" />
            <a-divider type="vertical" />
            <span>喜欢</span>
          </a-button>
        </div>
      </div>
    </div>
    <div class="article-main">
      <a-comment>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <div slot="content">
          <a-form-item>
            <a-textarea :rows="4" placeholder="写下你的评论"></a-textarea>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" type="primary">
              发送
            </a-button>
          </a-form-item>
        </div>
      </a-comment>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style lang="less" scoped>
@pageGap: 40px;

.article-main {
  margin-top: 30px;
  background-color: #fff;
  padding: @pageGap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  &__title {
    word-break: break-word;
    font-size: 28px;
    font-weight: bold;
    line-height: 1.4;
  }
}

.article-cover {
  margin-top: 20px;

  &__img {
    margin-right: 12px;
  }

  &__name {
    font-size: 16px;
    span {
      margin-right: 16px;
      font-size: 12px;
      color: #b9bfc3;
    }
  }
}

.article-cnt {
  margin-top: 30px;
}

.article-action {
  border-top: 1px solid #eff3f5;
  margin: 30px -@pageGap 0 -@pageGap;
  padding: 10px @pageGap 0 @pageGap;

  &-tag {
    position: relative;
    font-size: 13px;
    color: #b9bfc3;
    margin-bottom: 20px;
  }

  &-item {
    margin-right: 160px;

    li {
      display: inline-block;
      margin-right: 16px;
      margin-bottom: 8px;
    }
  }

  &-date {
    position: absolute;
    right: 0;
    top: 0;
  }

  &-btn {
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 100px;
  }

  &-keep {
    margin-right: 40px;
  }
}
</style>

<style lang="less">
.article-cnt-work {
  font-size: 16px;
  line-height: 2;
}
</style>
