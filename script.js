const names = ["小野", "梶原", "河野", "久保山", "斎藤", "西川", "二宮", "原川", "松崎", "松永", "水野", "森川", "安成"];
window.addEventListener('DOMContentLoaded', () => {
    $.each(names, (i, value) => {
        $('<div>')
            .addClass('form-check-inline')
            .append(
                $('<div>')
                    .addClass('custom-control custom-checkbox')
                    .append(
                        $('<input>')
                            .attr('type', 'checkbox')
                            .addClass('custom-control-input checks')
                            .attr('id', i)
                            .attr('checked', 'checked')
                    )
                    .append(
                        $('<label>')
                            .addClass('custom-control-label')
                            .attr('for', i)
                            .html(value)
                    )
            )
            .appendTo('#nameList')
        ;
    });
});
const groupNum = [
    [0, 8, 1, 3, 11, 4, 6, 10, 2, 9, 7, 5, 12],
    [11, 1, 9, 2, 4, 12, 0, 7, 5, 3, 10, 8, 6],
    [7, 3, 2, 10, 9, 5, 12, 1, 8, 6, 4, 11, 0]
];
document.querySelector('#shuffle').addEventListener('click', () => {
    $('#tables').empty();

    const checks = document.querySelectorAll('.checks:checked');
    const checkCnt = checks.length;
    $.each(groupNum, (i, row) => {
        groupNum[i] = groupNum[i].filter((value) => {
            return value < checkCnt;
        });
    });
    const member = new Array();
    $.each(checks, (i, value) => {
        member[i] = value.nextElementSibling.innerHTML;
    });
    const newMember = new Array();
    $.each(member, () => {
        let randomInt = Math.floor(Math.random() * member.length);
        newMember.push(member.splice(randomInt, 1)[0]);
    });
    const json = [];
    let data;
    $.each(newMember, (i, value) => {
        data = {
            name: value,
            combi: {
                first: {
                    number: groupNum[0][i],
                    teach: {
                        main: 0,
                        sub: 0
                    }
                },
                second: {
                    number: groupNum[1][i],
                    teach: {
                        main: 0,
                        sub: 0
                    }
                },
                third: {
                    number: groupNum[2][i],
                    teach: {
                        main: 0,
                        sub: 0
                    }
                }
            }
        };
        json.push(data);
    });
    const teamNum = new Array();
    const teams = Math.floor(groupNum[0].length / 3);
    for (let i = 0; i < teams; i++) {
        teamNum.push(3);
    }
    if (groupNum[0].length % 3 >= 1) {
        teamNum[teamNum.length - 1]++;
    }
    if (groupNum[0].length % 3 >= 2) {
        teamNum[teamNum.length - 2]++;
    }
    for (let i = 0; i < 3; i++) {
        const $table = $('<table>')
            .addClass('table table-striped table-dark')
            .append(
                $('<tr>')
                    .append(
                        $('<th class="text-center">CC →</th>')
                    )
                    .append(
                        $('<th class="text-center">CL →</th>')
                    )
                    .append(
                        $('<th class="text-center">OB →</th>')
                    )
                    .append(
                        $('<th class="text-center">OB →</th>')
                    )
            )
        ;
        $.each(teamNum, (j, value) => {
            const $tr = $('<tr>');
            let memname;
            for (let k = 0; k < value; k++) {
                for (let l = 0; l < newMember.length; l++) {
                    let jsonCombi;
                    if (i === 0) {
                        jsonCombi = json[l].combi.first;
                    }else if (i === 1) {
                        jsonCombi = json[l].combi.second;
                    }else {
                        jsonCombi = json[l].combi.third;
                    }
                    if (jsonCombi.number === (3 * j) + k) {
                        memname = json[l].name;
                    }
                }
                $tr
                    .append(
                        $('<td>')
                            .attr('id', j + '-' + k)
                            .addClass('text-center')
                            .html(memname)
                    )
            }
            $tr
                .appendTo(
                    $table
                )
            ;
        });
        $('<div>')
            .append(
                $('<h2>')
                    .html('round ' + (i + 1))
            )
            .append($table)
            .appendTo('#tables')
        ;
    }
});