/*-----------------------------
리스트 속 string을 파싱하는 함수
------------------------------*/

function parseList(list) {

    if (!Array.isArray(list))
    {
        return this;
    }
    else
    {
        var s = "";

        for (var i = 0; i < list.length; i++)
        {
            if (Array.isArray(list[i]))
            {
                s += list[i].join("\t");

                if (i < list.length - 1)
                {
                    s += "\n";
                }
            }
            else
            {
                s += list[i];

                if (i < list.length - 1) {
                    s += "\t";
                }
            }
        }
    }
    this.text = s;
    this.dirty = true;

    return this;
};
