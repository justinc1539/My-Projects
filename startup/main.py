import os
import shutil

USERNAME = os.environ.get("USERNAME")

# ROBLOX FILES FIX
path = fr"C:\Users\{USERNAME}\AppData\Local\Roblox\Versions"
for folder in [i for i in os.listdir(path) if not os.path.isfile(fr"{path}\{i}")]:
    try:
        os.mkdir(fr"{path}\{folder}\ClientSettings")
    except FileExistsError:
        pass
    with open(fr"{path}\{folder}\ClientSettings\ClientAppSettings.json", "w") as file:
        file.write('{"DFIntTaskSchedulerTargetFps":999, "FFlagHandleAltEnterFullscreenManually":"False"}')
    try:
        shutil.rmtree(fr"{path}\{folder}\PlatformContent\pc\textures")
    except FileNotFoundError:
        pass

# DELETE %TEMP%
path = fr"C:\Users\{USERNAME}\AppData\Local\Temp"
for file in os.listdir(path):
    print(fr"{path}\{file}")
    try:
        shutil.rmtree(fr"{path}\{file}")
    except FileNotFoundError:
        pass
    except NotADirectoryError:
        try:
            os.remove(fr"{path}\{file}")
        except PermissionError as i:
            if "[WinError 32]" not in str(i):  # and "[WinError 5]" not in str(i):
                os.remove(fr"{path}\{file}")
