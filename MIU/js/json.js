/**
 * @author Lucy Hutcheson
 * Date: 2012-03-01
 * Created for:  Mobile Interfaces and Usability 1203
 */


//Sample data for viewing
var json = {
	adults : {
		name: "Adults",
		description: "Bible studies designed for the adult audience.",
		items: [
			{
				"name": ["Lesson Name:", "3 Things You Need To Know Before (And After) You Become A Christian "],
				"author": ["Author:", "Bible Study Planet"],
				"email": ["Email:", "contact@biblestudyplanet.com"],
				"date": ["Date:", "2012-02-09"],
				"topic": ["Topics:", "Christian Life"],
				"book": ["Book:", "Romans"],
				"audience": ["Audience:", "Adults"],
				"length": ["Length:", "90"],
				"lesson": ["Lesson Text:", "There are three things a person needs to know in order to become a Christian and then live a fulfilling life in Christ.1) You need to know you are a sinner. 2) You need to know how you can be forgiven for your sins. 3) You need to know how you should respond to God’s forgiveness. Why this is important to know: In order to grow in Christ we need to know how to respond to God’s grace. What Christ has done for us effects how we live. We do good works, not to be saved, but because Christ has saved us (Eph 2:10). We forgive because Christ has forgiven us (Matt 6:12). We bless because Christ has blessed us (Eph 1:3). We served because Christ has served us (Mrk 10:45). We love because Christ has loved us (1 Jhn 4:19)."]
			},
			{
				"name": ["Lesson Name:", "7 Commands for Christian Living"],
				"author": ["Author:", "Bible Study Planet"],
				"email": ["Email:", "contact@biblestudyplanet.com"],
				"date": ["Date:", "2012-02-09"],
				"topic": ["Topics:", "Christian Life"],
				"book": ["Book:", "1 Thessalonians"],
				"audience": ["Audience:", "Adults"],
				"length": ["Length:", "90"],
				"lesson": ["Lesson Text:", "\"Rejoice always, pray without ceasing, in everything give thanks; for this is the will of God in Christ Jesus for you. Do not quench the Spirit. Do not despise prophecies. Test all things; hold fast what is good. Abstain from every form of evil.\" – 1 Thessalonians 5:16-22 In this passage Paul is summing up how the Christian should live. In seven verses he gives us seven commands for Christian living. Let’s go through them one by one."]
			},
			{
				"name": ["Lesson Name:", "3 Things You Need To Know Before (And After) You Become A Christian "],
				"author": ["Author:", "Bible Study Planet"],
				"email": ["Email:", "contact@biblestudyplanet.com"],
				"date": ["Date:", "2012-02-09"],
				"topic": ["Topics:", "Christian Life"],
				"book": ["Book:", "Romans"],
				"audience": ["Audience:", "Adults"],
				"length": ["Length:", "90"],
				"lesson": ["Lesson Text:", "There are three things a person needs to know in order to become a Christian and then live a fulfilling life in Christ.1) You need to know you are a sinner. 2) You need to know how you can be forgiven for your sins. 3) You need to know how you should respond to God’s forgiveness. Why this is important to know: In order to grow in Christ we need to know how to respond to God’s grace. What Christ has done for us effects how we live. We do good works, not to be saved, but because Christ has saved us (Eph 2:10). We forgive because Christ has forgiven us (Matt 6:12). We bless because Christ has blessed us (Eph 1:3). We served because Christ has served us (Mrk 10:45). We love because Christ has loved us (1 Jhn 4:19)."]
			}
		]
	},
	men:{
		name: "Men",
		description: "Bible studies designed for the men audience.",
		items: [
				{
					"name": ["Lesson Name:", "By Grace, Through Faith"],
					"author": ["Author:", "Bible Study Planet"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Men"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"It is by grace you have been saved, through faith — and this not from yourselves, it is the gift of God — not by works, so that no one can boast.\" – Ephesians 2:8-9 God is gracious… Because God is gracious, sinful people are forgiven, converted, purified, and saved. It’s not because of anything in them, or anything that ever can be in them, that they are saved; it’s because of the boundless love, goodness, pity, compassion, mercy, and grace of God. It’s because “his love endures forever” (1 Chronicles 16:41) that we are not destroyed. It’s because “his compassions never fail” (Lamentations 3:22) that sinners are brought to Him and forgiven. Remember these things or you may fall into error by focusing so much on your faith that you forget that grace is the source of faith itself."]
				},
				{
					"name": ["Lesson Name:", "Honoring Our Parents Part 3; How We Honor Our Parents"],
					"author": ["Author:", "Pastor Terry Gurno"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Men"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "Why Should We Obey Our Parents? Because God promises you a long life. Notice at the end of this Commandment it says, “Honor your father and mother so that you may live long in the land the Lord your God is giving you.” (Exodus 20:12). So not only live long, but notice it says, “In the land your God is giving you.” He is not talking about individuals, He is talking about society and when the family unit breaks down, the society breaks down. Nobody knows that better than the United States of America because it is the greatest battle, and it is the greatest challenge that we face. The preservation of the family unit is the preservation of generations to follow. The family is the backbone of society. “That you may live long in the land as a society, as a unit,” that’s what God is really talking about."]
				},
				{
					"name": ["Lesson Name:", "By Grace, Through Faith"],
					"author": ["Author:", "Bible Study Planet"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Men"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"It is by grace you have been saved, through faith — and this not from yourselves, it is the gift of God — not by works, so that no one can boast.\" – Ephesians 2:8-9 God is gracious… Because God is gracious, sinful people are forgiven, converted, purified, and saved. It’s not because of anything in them, or anything that ever can be in them, that they are saved; it’s because of the boundless love, goodness, pity, compassion, mercy, and grace of God. It’s because “his love endures forever” (1 Chronicles 16:41) that we are not destroyed. It’s because “his compassions never fail” (Lamentations 3:22) that sinners are brought to Him and forgiven. Remember these things or you may fall into error by focusing so much on your faith that you forget that grace is the source of faith itself."]
				}
		]
	},
	women : {
		name: "Women",
		description: "Bible studies designed for the women audience.",
		items: [
				{
					"name": ["Lesson Name:", "The 3 Steps of Repentance"],
					"author": ["Author:", "Bible Study Planet"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Christian Life"],
					"book": ["Book:", "2 Corinthians"],
					"audience": ["Audience:", "Women"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"Godly sorrow produces repentance leading to salvation…\" – 2 Corinthians 7:10 To repent means to change one’s attitude towards sin and God. It’s a change that must occur in both the mind and the heart."]
				},
				{
					"name": ["Lesson Name:", "Honoring Your Parents Part 4; Let The Healing Begin "],
					"author": ["Author:", "Pastor Terry Gurno"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Women"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "Family is so precious. It's absolutely priceless. God knows that, and that's why he places such high value on the family. Relationship with God, then relationship with family. That's not by accident, that's by design. For those of you we prayed for (In the Introduction), I pray God has been able to speak to you. Really what I am praying for is this would be a freeing message. God is not asking you to live in denial. He is not asking you to deny your feelings. He is asking you to be honest with them, and face them, so that you are not holding on to bitterness or unforgiveness and just passing them on. Then you can be the training center within your homes that God intended you to be. I want to challenge you, if you struggle with this, find one thing to honor your parents for."]
				},
				{
					"name": ["Lesson Name:", "7 Commands for Christian Living"],
					"author": ["Author:", "Bible Study Planet"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-09"],
					"topic": ["Topics:", "Christian Life"],
					"book": ["Book:", "1 Thessalonians"],
					"audience": ["Audience:", "Women"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"Rejoice always, pray without ceasing, in everything give thanks; for this is the will of God in Christ Jesus for you. Do not quench the Spirit. Do not despise prophecies. Test all things; hold fast what is good. Abstain from every form of evil.\" – 1 Thessalonians 5:16-22 In this passage Paul is summing up how the Christian should live. In seven verses he gives us seven commands for Christian living. Let’s go through them one by one."]
				},
				{
					"name": ["Lesson Name:", "The 3 Steps of Repentance"],
					"author": ["Author:", "Bible Study Planet"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Christian Life"],
					"book": ["Book:", "2 Corinthians"],
					"audience": ["Audience:", "Women"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"Godly sorrow produces repentance leading to salvation…\" – 2 Corinthians 7:10 To repent means to change one’s attitude towards sin and God. It’s a change that must occur in both the mind and the heart."]
				}
			]
	},
	youth : {
		name: "Youth",
		description: "Bible studies designed for the youth audience.",
		items: [
				{
					"name": ["Lesson Name:", "Honoring Your Parents; Part 1 – When Struggling To Honor You Parents "],
					"author": ["Author:", "Pastor Terry Gurno"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Youth"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"Honor your father and your mother, so that you may live long in the land the Lord your God is giving you.\" (Exodus 20:12) I know that when I read this commandment there are some people, and I am one of them, who have struggled to work through this commandment in our life. Some of you right now didn’t even like the way that verse read or sounded because honestly you don’t know why or how or what would be the reason to literally honor your mother and father."]
				},
				{
					"name": ["Lesson Name:", "Honoring Your Parents Part 2; Five Things Family Teaches Us"],
					"author": ["Author:", "Pastor Terry Gurno"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Youth"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "This commandment is so important because it lists the value of your family. The family is the birthplace of a lot of things, and we are going to talk about five of those things in this study. 1) FAMILY IS THE BIRTHPLACE OF YOUR VALUES 2) FAMILY IS A RELATIONSHIP TRAINING CENTER 3) FAMILY IS WHERE WE LEARN ABOUT AUTHORITY 4) FAMILY IS WHERE WE LEARN OUR VALUE AS A HUMAN 5) FAMILY IS WHERE WE LEARN ABOUT FAITH"]
				},
				{
					"name": ["Lesson Name:", "Honoring Our Parents Part 3; How We Honor Our Parents"],
					"author": ["Author:", "Pastor Terry Gurno"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Youth"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "Why Should We Obey Our Parents? Because God promises you a long life. Notice at the end of this Commandment it says, “Honor your father and mother so that you may live long in the land the Lord your God is giving you.” (Exodus 20:12). So not only live long, but notice it says, “In the land your God is giving you.” He is not talking about individuals, He is talking about society and when the family unit breaks down, the society breaks down. Nobody knows that better than the United States of America because it is the greatest battle, and it is the greatest challenge that we face. The preservation of the family unit is the preservation of generations to follow. The family is the backbone of society. “That you may live long in the land as a society, as a unit,” that’s what God is really talking about."]
				},
				{
					"name": ["Lesson Name:", "Honoring Your Parents Part 4; Let The Healing Begin "],
					"author": ["Author:", "Pastor Terry Gurno"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Youth"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "Family is so precious. It's absolutely priceless. God knows that, and that's why he places such high value on the family. Relationship with God, then relationship with family. That's not by accident, that's by design. For those of you we prayed for (In the Introduction), I pray God has been able to speak to you. Really what I am praying for is this would be a freeing message. God is not asking you to live in denial. He is not asking you to deny your feelings. He is asking you to be honest with them, and face them, so that you are not holding on to bitterness or unforgiveness and just passing them on. Then you can be the training center within your homes that God intended you to be. I want to challenge you, if you struggle with this, find one thing to honor your parents for."]
				},
				{
					"name": ["Lesson Name:", "Honoring Your Parents; Part 1 – When Struggling To Honor You Parents "],
					"author": ["Author:", "Pastor Terry Gurno"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Youth"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"Honor your father and your mother, so that you may live long in the land the Lord your God is giving you.\" (Exodus 20:12) I know that when I read this commandment there are some people, and I am one of them, who have struggled to work through this commandment in our life. Some of you right now didn’t even like the way that verse read or sounded because honestly you don’t know why or how or what would be the reason to literally honor your mother and father."]
				},
				{
					"name": ["Lesson Name:", "Honoring Your Parents Part 2; Five Things Family Teaches Us"],
					"author": ["Author:", "Pastor Terry Gurno"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Youth"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "This commandment is so important because it lists the value of your family. The family is the birthplace of a lot of things, and we are going to talk about five of those things in this study. 1) FAMILY IS THE BIRTHPLACE OF YOUR VALUES 2) FAMILY IS A RELATIONSHIP TRAINING CENTER 3) FAMILY IS WHERE WE LEARN ABOUT AUTHORITY 4) FAMILY IS WHERE WE LEARN OUR VALUE AS A HUMAN 5) FAMILY IS WHERE WE LEARN ABOUT FAITH"]
				}
		]
	},
	children : {
		name: "Children",
		description: "Bible studies designed for the children audience.",
		items: [
				{
					"name": ["Lesson Name:", "7 Ways God Loves Us"],
					"author": ["Author:", "Bible Study Planet"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Children"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life. For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.\" (Jhn 3:16-17)"]
				},
				{
					"name": ["Lesson Name:", "Who You Are In Christ"],
					"author": ["Author:", "Bible Study Planet"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Children"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.\" – 2 Corinthians 5:17"]
				},
				{
					"name": ["Lesson Name:", "7 Ways God Loves Us"],
					"author": ["Author:", "Bible Study Planet"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Children"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life. For God did not send his Son into the world to condemn the world, but in order that the world might be saved through him.\" (Jhn 3:16-17)"]
				},
				{
					"name": ["Lesson Name:", "Who You Are In Christ"],
					"author": ["Author:", "Bible Study Planet"],
					"email": ["Email:", "contact@biblestudyplanet.com"],
					"date": ["Date:", "2012-02-19"],
					"topic": ["Topics:", "Family"],
					"book": ["Book:", "Exodus"],
					"audience": ["Audience:", "Children"],
					"length": ["Length:", "90"],
					"lesson": ["Lesson Text:", "\"Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.\" – 2 Corinthians 5:17"]
				}
		]
	}
};
