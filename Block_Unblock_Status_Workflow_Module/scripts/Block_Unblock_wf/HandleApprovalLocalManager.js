var decision = {
    "UserId": $.usertasks.usertask1.last.processor,
    "Role": "Local Manager",
    "Action": $.usertasks.usertask1.last.decision,
    "Comment": $.context.comment
};

$.context.History.push(decision);
$.context.comment = "";

$.context.decision = $.usertasks.usertask1.last.decision;